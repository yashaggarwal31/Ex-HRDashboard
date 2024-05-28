"use server";
import { notFound } from "next/navigation";
import { dbConnect } from "./renderDB";
import { Database } from "@/types/database.types";
import { sendEmail } from "./email";
import { getUserIdFromClerkId } from "./users";

type ticketInsert = Database["public"]["Tables"]["Ticket"]["Insert"];

const get_ticket = ` SELECT
tickets.id as ticket_id,
tickets.title as title,
tickets.description as description,
category.categoryname AS category,
ticketpriority.name AS priority,
ticketstatus.name AS status,
users_createdby.username AS createdby,
tickets.createdat,
users_assignedto.username AS assignedto,
users_closedby.username AS closedby,
tickets.closedat
FROM
    tickets
LEFT JOIN
    category ON tickets.subcategory_id = category.id
LEFT JOIN
    ticketpriority ON tickets.priority = ticketpriority.id
LEFT JOIN
    ticketstatus ON tickets.status = ticketstatus.id
LEFT JOIN
    users AS users_createdby ON tickets.createdby = users_createdby.id
LEFT JOIN
    users AS users_assignedto ON tickets.assignedto = users_assignedto.id
LEFT JOIN
    users AS users_closedby ON tickets.closedby = users_closedby.id`;

export async function getRowByCategory(id: number) {
  const client = await dbConnect();
  const query = {
    text: `
    select * from userrole_mapping ur
    where ur.category_id = $1`,
    values: [id],
  };

  const data = await client.query(query);
  return data;
}

export async function addTicket(body: string) {
  const client = await dbConnect();
  try {
    const ticket: {
      sub_category_id: number;
      priority: number;
      title: string;
      description: string;
      created_by: string;
    } = JSON.parse(body);

    const userId = await getUserIdFromClerkId(ticket.created_by);
    console.log("userId while posting ticket", userId);
    const UserRoleRow = await getRowByCategory(ticket.sub_category_id);
    const Ticket = {
      sub_category_id: ticket.sub_category_id,
      priority: ticket.priority,
      title: ticket.title,
      description: ticket.description,
      status_id: 1,
      created_by: userId,
      assigned_to: UserRoleRow.data
        ? UserRoleRow.data.length != 0
          ? UserRoleRow.data[0].user_id
          : null
        : null,
    };
    const query = {
      text: "insert into tickets (title, description, subcategory_id, priority, status, createdby, assignedto) values ($1, $2, $3, $4, $5, $6, $7)",
      values: [
        Ticket.title,
        Ticket.description,
        Ticket.sub_category_id,
        Ticket.priority,
        Ticket.status_id,
        userId,
        Ticket.assigned_to,
      ],
    };

    const result = await client.query(query);
    // client.end()
    return true;
  } catch (error: any) {
    return false;
  }
}

export async function AssignUser(ticket_id: number, user_id: number) {
  const client = await dbConnect();
  const query = {
    text: "update tickets set assignedto = $1 where id = $2",
    values: [user_id, ticket_id],
  };
  try {
    await client.query(query);
    const query_2 = {
      text: "select email from Users where id = $1",
      values: [user_id],
    };
    const email_db = await client.query(query_2);
    const ticket_db = await client.query({
      text: "select title, description from tickets where id=$1",
      values: [ticket_id],
    });
    if (email_db.rowCount > 0) {
      const email = email_db.rows[0].email;
      const title = ticket_db.rows[0].title;
      const desc = ticket_db.rows[0].description;
      console.log(email);
      const options = {
        to: email,
        subject: "Update: New Ticket Assigned",
        message: `
      <h3>A new ticket has been assigned, please check your HrSquared Account!</h3>
      <h4>Title: ${title}</h4>
      <p>Description: ${desc}</p>
      `,
      };
      console.log(options, "**********");
      await sendEmail(options);
    }
    return true;
  } catch (ex) {
    return false;
  }
}

export async function updateStatus(ticket_id: number, status: number) {
  const client = await dbConnect();
  const query = {
    text: "update tickets set status = $1, closedat=CURRENT_TIMESTAMP where id = $2 RETURNING id",
    values: [status, ticket_id],
  };

  try {
    await client.query(query);

    const ticket_db = await client.query({
      text: "select title, description, createdby from tickets where id=$1",
      values: [ticket_id],
    });
    const user_id = ticket_db.rows[0].createdby;
    const user_db = await client.query({
      text: "select username, email from users where id=$1",
      values: [user_id],
    });
    const email = user_db.rows[0].email;
    const title = ticket_db.rows[0].title;
    const desc = ticket_db.rows[0].description;
    const status_db = await client.query({
      text: "select name from ticketstatus where id=$1",
      values: [status],
    });
    const options = {
      to: email,
      subject: `Update: Ticket #${ticket_id} Status Updated`,
      message: `
    <h3>Your ticket #${ticket_id} status has been updated</h3>
    <h4>Title: ${title}</h4>
    <p>Description: ${desc}</p>
    <p>Current status: ${status_db.rows[0].name}</p>
    `,
    };
    console.log(options, "**********");
    await sendEmail(options);
    return true;
  } catch (ex) {
    return false;
  }
}

export async function deligateTicket(ticket_id: number) {
  const client = await dbConnect();
  const query = {
    text: "update tickets set status = 1, assignedto=null where id = $1 RETURNING id",
    values: [ticket_id],
  };

  try {
    await client.query(query);
    return true;
  } catch (ex) {
    return false;
  }
}

export async function getUserTickets(userID) {
  const client = await dbConnect();

  const id = await getUserIdFromClerkId(userID);
  console.log("ID", id);

  const query = {
    text: `${get_ticket} where users_createdby.id=$1 order by tickets.createdat desc;`,
    values: [id],
  };

  const data = await client.query(query);
  // console.log("data", data);
  return data.rows;
  // client.end()
  // console.log(data);

  // if (data.rowCount > 0) {
  //   return data.rows;
  // } else {
  //   notFound();
  // }
}

export async function getAllTickets() {
  const client = await dbConnect();

  const query = {
    text: `${get_ticket} order by tickets.createdat desc;`,
  };

  const data = await client.query(query);
  return data.rows;
  // client.end()
  // console.log(data);

  // if (data.rowCount > 0) {
  //   return data.rows;
  // } else {
  //   notFound();
  // }
}

export async function getAssignedTickets(id) {
  const client = await dbConnect();

  const userId = await getUserIdFromClerkId(id);

  const query = {
    text: `${get_ticket} where users_assignedto.id=$1;`,
    values: [userId],
  };

  const data = await client.query(query);
  return data.rows;
  // client.end()
  // console.log(data);

  // if (data.rowCount > 0) {
  //   return data.rows;
  // } else {
  //   notFound();
  // }
}

export async function getTicketFormData() {
  const client = await dbConnect();
  const groups_data = await client.query("select * from groups");
  const category_data = await client.query("select * from category");
  const ticketpriority_data = await client.query(
    "select * from ticketpriority"
  );

  return {
    groups: groups_data.rowCount > 0 ? groups_data.rows : [],
    categories: category_data.rowCount > 0 ? category_data.rows : [],
    ticketpriority:
      ticketpriority_data.rowCount > 0 ? ticketpriority_data.rows : [],
  };
}
