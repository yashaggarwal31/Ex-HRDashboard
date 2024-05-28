"use server";
import { notFound } from "next/navigation";
import { dbConnect } from "./renderDB";
import { Database } from "@/types/database.types";
import { getUserIdFromClerkId } from "./users";

// type ticketInsert = Database["public"]["Tables"]["Ticket"]["Insert"];
type FeedbackInsert = Database["public"]["Tables"]["Feedback"]["Insert"];

export async function addFeedback(Feedback: FeedbackInsert) {
  console.log("hello add feedback");
  console.log(Feedback);

  const id = await getUserIdFromClerkId(Feedback.userId);
  const client = await dbConnect();
  try {
    // console.log(Feedback)
    const query = {
      text: "insert into feedbacks (title, description, createdby, isanon) values ($1, $2, $3, $4)",
      values: [Feedback.title, Feedback.description, id, Feedback.anonymous],
    };
    const result = await client.query(query);
    // client.end();
    return true;
  } catch (error) {
    console.log(error);
    client.end();
    return false;
  }
}

export async function GetFeedbacks(notViewed?: boolean) {
  const client = await dbConnect();
  try {
    let query_text;
    if (notViewed) {
      query_text = `select feedbacks.*,
            case
                when feedbacks.createdby is not null then users.username
                else NULL
            END AS createdby
            from feedbacks
            left join users
            on feedbacks.createdby = users.id where viewed=false`;
    } else {
      query_text = `select feedbacks.*,
            case
                when feedbacks.createdby is not null then users.username
                else NULL
            END AS createdby
            from feedbacks
            left join users
            on feedbacks.createdby = users.id`;
    }
    // console.log(query_text+" LLLLLLLLLLLL")
    query_text = `${query_text} ORDER BY createdat DESC`;
    const result = await client.query(query_text);
    if (result.rowCount > 0) {
      return result.rows;
    } else {
      notFound();
    }
  } catch (error) {
    client.end();
    return false;
  }
}

export async function MarkViewed(id: number) {
  const client = await dbConnect();
  try {
    const query = {
      text: "update feedbacks set viewed = true where id = $1",
      values: [id],
    };
    const result = await client.query(query);
    // client.end();
    return true;
  } catch (error) {
    client.end();
    return false;
  }
}

export async function GetUserFeedbacks(userId, notViewed?: boolean) {
  const client = await dbConnect();

  const id = await getUserIdFromClerkId(userId);

  try {
    let query_text;
    if (notViewed) {
      query_text = `select feedbacks.*,
            case
                when feedbacks.createdby is not null then users.username
                else NULL
            END AS createdby
            from feedbacks
            left join users
            on feedbacks.createdby = users.id where viewed=false and users.id=$1`;
    } else {
      query_text = `select feedbacks.*,
            case
                when feedbacks.createdby is not null then users.username
                else NULL
            END AS createdby
            from feedbacks
            left join users
            on feedbacks.createdby = users.id where users.id=$1`;
    }
    const query = {
      text: `${query_text} ORDER BY createdat DESC`,
      values: [id],
    };
    query_text = `${query_text} ORDER BY createdat DESC`;
    const result = await client.query(query);
    // if (result.rowCount > 0) {
    return result.rows;
    // } else {
    //   notFound();
    // }
  } catch (error) {
    console.log("**************************");
    console.log(error);
    notFound();
  }
}
