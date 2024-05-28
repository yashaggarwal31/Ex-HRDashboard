import { notFound } from 'next/navigation';
import { dbConnect } from './renderDB'

export async function cardFeedbackData() {
    const query = {
        text: `
        SELECT count(*) as total_responses, (select count(*) from feedbacks) as totalcount
        FROM public.feedbacks
        where viewed= true
        `,
      };

      const client = await dbConnect();
      
      const data = await client.query(query);
      if(data.rowCount>0) {
        return data.rows;
      }else {
        notFound()
      }
}

export async function cardSurveysData() {
    const query = {
        text: `
        select count (*) as totalcount, (select count(*) from surveyresponses) as total_responses  
        from surveys
        `,
    };

    const client =  await dbConnect();

    const data = await client.query(query);
    if(data.rowCount>0) {
        return data.rows;
    }else {
        notFound();
    }
}

export async function cardTicketsData() {
    const query = {
        text: `
        SELECT count(*) as total_responses, (select count(*) from tickets) as totalcount
        FROM public.tickets
        where status =4
        `,
    };

    const client = await dbConnect();

    const data = await client.query(query);

    if(data.rowCount>0) {
        return data.rows;
    }else {
        notFound()
    }
}

export async function dataTickets() {
    const query = {
        text:
        `
        SELECT
        category.categoryname AS subcategory_name,
        COUNT(CASE WHEN tickets.status = 1 THEN tickets.id END) AS open_tickets,
        COUNT(CASE WHEN tickets.status = 4 THEN tickets.id END) AS closed_tickets
        FROM
            tickets
        JOIN
            category ON tickets.subcategory_id = category.id
        GROUP BY
            category.categoryname;
        `
      };

      const client = await dbConnect();
      const data = await client.query(query);
      if(data.rowCount>0){
        return data.rows;
      }else {
        notFound();
      }
}

export async function getFeedbackCount() {
    const query = {
        text:
        `
        SELECT 
        TO_CHAR(createdat, 'Month YYYY') AS month,
        COUNT(*) AS total_feedbacks
        FROM 
            feedbacks
        GROUP BY 
            TO_CHAR(createdat, 'Month YYYY')
        ORDER BY 
            MIN(createdat);
        `
      }

      const client = await dbConnect();
      const data = await client.query(query);

      if(data.rowCount>0) {
        return data.rows;
      }else {
        notFound();
      }
}

export async function getRecentFeedbacks() {
    const query = {
        text: 
        `
        SELECT 
        f.id, 
        f.title,
        f.description,
        f.createdat,
        COALESCE(u.username, 'Anonymous') AS username
        FROM 
            feedbacks AS f
        LEFT JOIN 
            users AS u ON f.createdby = u.id
        ORDER BY 
            f.createdat DESC;
        `,
      };

      const client = await dbConnect();
      const data = await client.query(query);
      if(data.rowCount>0) return data.rows;
      else notFound();
}

export async function getRecentSurveys() {
    const query = {
        text: `
        SELECT s.id AS survey_id, 
        s.title AS survey_title,
        s.createdat AS created_at,
        u.username AS creator_name,
        COUNT(sr.id) AS total_responses
        FROM surveys s
        LEFT JOIN surveyresponses sr ON s.id = sr.survey_id
        LEFT JOIN users u ON s.createdby = u.id
        GROUP BY s.id, s.title, s.createdat, u.username
        ORDER BY s.id DESC;
        `,
      };

      const client = await dbConnect();
      const data = await client.query(query);

      if(data.rowCount>0) return data.rows;
      else notFound();
}

export async function getRecentTickets(){
    const query = {
        text: 
        `
        SELECT tk.id,tk.title, tk.description, c.categoryname, tp.name AS priority, ts.name AS status, tk.createdat
        FROM tickets AS tk
        JOIN category AS c ON tk.subcategory_id = c.id
        JOIN ticketpriority AS tp ON tk.priority = tp.id
        JOIN ticketstatus AS ts ON tk.status = ts.id
        ORDER BY tk.createdat DESC;
        `,
      };

      const client = await dbConnect();
      const data = await client.query(query);
      if(data.rowCount>0) return data.rows;
      else notFound();
}