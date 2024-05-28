'use server'
const getAdminSurveys = () => {}

import { notFound } from 'next/navigation'
import { dbConnect } from './renderDB'
import { Database } from '@/types/database.types'
import { JSDOM } from 'jsdom'
import { object } from 'zod'
import { getUserIdFromClerkId } from './users'

type SurveyInsert = Database['public']['Tables']['Survey']['Insert']
type SurveyResponseInsert =
  Database['public']['Tables']['SurveyResponses']['Insert']

export async function getRecentSurveys () {
  const client = await dbConnect()

  const query = {
    text: `
      SELECT s.id AS survey_id, 
      s.title AS survey_title,
      s.createdat AS created_at,
      s.closes_at as closes_at,
      c.groupname as category,
      u.username AS creator_name,
      COUNT(sr.id) AS total_responses
      FROM surveys s
      LEFT JOIN surveyresponses sr ON s.id = sr.survey_id
      LEFT JOIN users u ON s.createdby = u.id
      LEFT JOIN "groups" c ON c.id = s.category
      GROUP BY s.id, s.title, s.createdat,c.groupname, u.username
      ORDER BY s.id DESC;
        `
  }

  const data = await client.query(query)
  // client.end()
  // console.log(data)

  return data.rows
}

export async function getUserSurveys (userID) {
  const client = await dbConnect()

  const userId = await getUserIdFromClerkId(userID)

  const query = {
    text: `
    SELECT
    s.id AS survey_id,
    s.title AS survey_title,
    s.createdat AS created_at,
    s.closes_at AS closes_at,
    gr.groupname AS category,
    u.username AS creator_name
    FROM
        surveys s
    LEFT JOIN
        "userrole_mapping" urm ON urm.group_id = s.category
    LEFT JOIN
        "users" u ON u.id = urm.user_id
    LEFT JOIN
        "groups" gr ON gr.id = s.category
    WHERE
        (u.id = $1 OR s.category IS NULL)
    GROUP BY
        s.id, s.title, s.createdat, s.closes_at, gr.groupname, u.username
    ORDER BY
        s.id DESC;
      `,
    values: [userId]
  }

  const data = await client.query(query)

  return data.rows
}

export async function AddSurvey (survey: SurveyInsert, creatorID: number) {
  const client = await dbConnect()
  try {
    console.log(survey)
    const surveyFieldsJSON = JSON.stringify(survey.survey_fields)
    const query = {
      text: 'insert into surveys (title, surveyfields, createdby, closes_at, category,survey_img) values ($1, $2, $3, $4, $5, $6)',
      values: [
        survey.title,
        surveyFieldsJSON,
        creatorID,
        survey.closes_at,
        survey.category,
        survey.survey_img
      ]
    }
    console.log(query)
    const result = await client.query(query)
    console.log(result)
    // client.end()
    return {
      status: 200,
      statusText: `${result.command} completed successfully`,
      result: result
    }
  } catch (error: any) {
    // client.end()
    return {
      error: error,
      status: 500,
      statusText: 'Internal server error',
      message: error.message,
      data: null
    }
  }
}

// export async function getSurveyResponses (id: number) {
//   const client = await dbConnect()
//   try {
//     const query = {
//       text: 'select * from surveyresponses where id = $1',
//       values: [id]
//     }
//     const result = await client.query(query)
//     client.end()
//     return result.rows
//   } catch (error) {
//     console.log(error)
//     client.end()
//     return 'Error Fetching'
//   }
// }

export async function GetSurveyResponses (id: number) {
  const client = await dbConnect()
  try {
    const query = {
      // text: `select sr.id, u.username, sr.response_data, sr.createdat from surveyresponses sr join users u on u.id = sr.user_id where sr.survey_id = $1;`,
      text: `select sr.id, u.username, sr.response_data, sr.createdat
      from surveyresponses sr 
      join users u
      on sr.user_id = u.id
      where sr.survey_id = $1; 
      `,
      values: [id]
    }
    const result = await client.query(query)
    // console.log(result);
    // client.end()
    return result.rows
  } catch (error) {
    console.log(error)
    // client.end()
    return 'error fetching'
  }
}

export async function getUserNameAndEmailForSurveyResponses (id: number) {
  const client = await dbConnect()
  try {
    const query = {
      // text: `select sr.id, u.username, sr.response_data, sr.createdat from surveyresponses sr join users u on u.id = sr.user_id where sr.survey_id = $1;`,
      text: `select sr.id, u.username, u.email
      from surveyresponses sr 
      join users u
      on sr.user_id = u.id
      where sr.survey_id = $1; 
      `,
      values: [id]
    }
    const result = await client.query(query)
    // console.log(result);
    // client.end()
    console.log(result.rows)
    return result.rows
  } catch (error) {
    console.log(error)
    // client.end()
    return 'error fetching'
  }
}

export async function GetResponseById (id: number) {
  const client = await dbConnect()
  try {
    const query = {
      text: 'select * from surveyresponses where id = $1',
      values: [id]
    }
    const result = await client.query(query)
    // client.end()
    return result.rows
  } catch (error) {
    console.log(error)
    // client.end()
    return 'Error Fetching'
  }
}

export async function getSurveyById (id: number) {
  const client = await dbConnect()
  try {
    const query = {
      text: 'select * from surveys where id = $1',
      values: [id]
    }
    const result = await client.query(query)
    // client.end()
    return result.rows
  } catch (error) {
    console.log(error)
    // client.end()
    return 'Error Fetching'
  }
}

export async function addUserResponse (response: SurveyResponseInsert) {
  const client = await dbConnect()
  const user_id = await getUserIdFromClerkId(response.user_id)
  const responseFieldsJSON = JSON.stringify(response.response_data)
  const query = {
    text: 'insert into surveyresponses (user_id, survey_id, response_data) values ($1, $2, $3)',
    values: [user_id, response.survey_id, responseFieldsJSON]
  }

  try {
    const result = await client.query(query)

    return result
  } catch (error) {
    return 'Error Fetching Data'
  }
}

export async function createJsonFromLabels (surveyLabels: any[]) {
  let JsonWithLabelSeqArr = []
  let jsonData: any = {}
  let labelArray = []

  surveyLabels.forEach(item => {
    item.label = item.label.trim()
    labelArray.push(item.label)
    switch (item.type) {
      case 0:
        // Text input
        jsonData[item.label] = []
        break
      case 1:
        // Dropdown/select
        jsonData[item.label] = []
        break
      case 2:
        jsonData[item.label] = []
      case 5:
        // File upload
        jsonData[item.label] = []
        break
      case 3:
        // Date input
        jsonData[item.label] = []
        break
      // case 4:
      //   // Matrix
      //   jsonData[item.label] = {};
      //   item.matrixRow.forEach(rowItem => {
      //     jsonData[item.label][rowItem] = [];
      //   });
      //   break;
      default:
        break
    }
  })

  JsonWithLabelSeqArr.push(labelArray)
  JsonWithLabelSeqArr.push(jsonData)

  console.log('our json !!!!', JsonWithLabelSeqArr)

  return JsonWithLabelSeqArr
}

export async function responsesToJson (
  form,
  surveyResponseData,
  JsonWithLabelSeqArr
) {
  // console.log('this is form\n ******* ',form );
  // console.log('this is SurveyResponse\n ******* ',surveyResponseData );

  let jsonData = JsonWithLabelSeqArr[1]
  let formLabels = JsonWithLabelSeqArr[0]
  // let labelArray = JsonWithLabelSeqArr[0];

  let responseIterator = 0

  for (let response of surveyResponseData) {
    response = response.response_data
    // console.log('individual response: ',response)
    const htmlString = JSON.parse(response)
    // console.log(htmlString)
    let htmlDATA = htmlString[htmlString.length - 1]
    form = htmlDATA.htmlString
    const dom = new JSDOM(form)
    const container = dom.window.document
    //parseString and create htmlString

    for (let data of htmlString) {
      // console.log('This is data: ',data.id);
      if (data.id) {
        const ele = container.querySelector(`#${data.id}`) as HTMLInputElement

        if (ele) {
          let label
          let value
          let radioLabel1
          let radioLabel2
          let flag = 0

          switch (ele.type) {
            case 'text':
              label = ele.parentElement.firstChild.textContent
              label = label.trim()
              value = data.answer

              if (label && jsonData[label]) {
                jsonData[label][responseIterator] = value
              }
              break
            case 'checkbox':
              label =
                ele.parentElement.parentElement.parentElement.firstChild
                  .textContent
              label = label.trim()
              value = ele.value
              if (label && jsonData[label]) {
                if (jsonData[label][responseIterator]) {
                  jsonData[label][responseIterator].push(value)
                } else {
                  jsonData[label][responseIterator] = []
                  jsonData[label][responseIterator].push(value)
                }
              }
              break
            case 'radio':
              flag = 1
              radioLabel1 =
                ele.parentElement?.parentElement?.parentElement?.parentElement
                  ?.parentElement?.parentElement?.firstChild.textContent
              radioLabel1 = radioLabel1.trim()
              radioLabel2 =
                ele.parentElement.parentElement.firstChild.textContent
              radioLabel2 = radioLabel2.trim()
              value = ele.value
              if (label && jsonData[radioLabel1][radioLabel2]) {
                jsonData[radioLabel1][radioLabel2][responseIterator] = value
              }
              break
            case 'file':
              if (!data.answer) {
                ele.value = 'No file uploaded'
                continue
              }
              label = ele.parentElement.parentElement.firstChild.textContent
              label = label.trim()
              value = data.answer

              if (label && jsonData[label]) {
                jsonData[label][responseIterator] = value
              }
              break

            case 'date':
              label = ele.parentElement.parentElement.firstChild.textContent
              label = label.trim()
              value = data.answer
              if (label && jsonData[label]) {
                jsonData[label][responseIterator] = value
              }
              break
            case 'select-one':
              label = ele.parentNode.firstChild.textContent
              label = label.trim()
              value = data.answer
              if (label && jsonData[label]) {
                jsonData[label][responseIterator] = value
              }
              break
          }

          console.log(
            'radio: ',
            radioLabel1,
            'radio2',
            radioLabel2,
            'JsonData ',
            jsonData[radioLabel1]
          )
          console.log('Label: ', label)
          console.log('Value: ', value)
        }

        // making sure all inputs are there
        // for(let labels in formLabels){
        //   jsonData[labels][responseIterator]
        // }
      }
    }

    formLabels.forEach(label => {
      if (!jsonData[label][responseIterator]) {
        jsonData[label][responseIterator] = 'n/a'
      }
    })

    responseIterator++
  }

  console.log('Final JSONNNNN**********\n')
  console.log(jsonData)

  return jsonData
}

export async function jsonToCsv (jsonData, userNameAndEmail) {
  if (userNameAndEmail.length == 0) return
  // Extract the headers from the JSON data
  const headers = Object.keys(jsonData)
  let csv = 'username,email,'
  csv = csv + headers.join(',') + '\n' // CSV header

  // Finding the maximum number of rows from data
  const maxRows = Math.max(
    ...Object.values(jsonData).map((arr: any) => arr.length)
  )

  for (let i = 0; i < maxRows; i++) {
    let prefix = `${userNameAndEmail[i].username},${userNameAndEmail[i].email},`
    const row = headers.map(header => {
      const values = jsonData[header]
      if (i < values.length) {
        const fieldValue = values[i]
        if (Array.isArray(fieldValue)) {
          // If it's a nested array, join with '&'
          return `"${fieldValue.join('&')}"`
        } else {
          // Enclose the field in double quotes for CSV safety
          return `"${fieldValue}"`
        }
      } else {
        // Handle cases where a key has fewer entries
        return '"n/a"'
      }
    })
    csv += prefix + row.join(',') + '\n' // Add the row to CSV
  }

  return csv
}

export async function getGroups () {
  const client = await dbConnect()
  const groups_data = await client.query('select * from groups')
  return groups_data.rows
}
