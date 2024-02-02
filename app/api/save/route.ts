// npm install mysql
// npm install @aws-sdk/client-secrets-manager
// npm install mysql2

// An error occured: Received packet in the wrong sequence.
//import * as mysql from 'mysql';
import * as mysql from 'mysql2/promise';

import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

// ■Routing: Route Handlers | Next.js
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export const dynamic = 'force-dynamic' // defaults to auto
import { type NextRequest, NextResponse } from 'next/server'
// import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
    console.log("Get Start1..")
    try {
        console.log("Get Start2..")
        // MySQL接続情報をSecretManagerから取得
        // const secret_name = "devMySQLUserOsaka20240202";
        // const client = new SecretsManagerClient({
        //     region: "ap-northeast-3",
        // })
        // console.log("Get Start3..")
        // An error occured.
        // [CredentialsProviderError]: Could not load credentials from any providers
        // let secretRes
        // try {
        //     secretRes = await client.send(
        //         new GetSecretValueCommand({
        //             SecretId: secret_name,
        //             VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        //         })
        //     )
        // } catch (error) {
        //     // For a list of exceptions thrown, see
        //     // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        //     throw error;
        // }
        // const secret = secretRes.SecretString
        // const secretJson = secret ? JSON.parse(secret) : {}
        // const connection = mysql.createConnection({
        //     host: secretJson.host,
        //     user: secretJson.username,
        //     password: secretJson.password,
        //     database: 'post1'
        // });

        // for debug.
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'user2',
            password: '',
            database: 'post1'
        })
        const currentDate = new Date().toISOString()
        console.log("Connect OK! currentDate", currentDate)
        
        const response = {
            statusCode: 200,
            body: {
                "result": "0", 
                "errorCode": ""
            }
        }
        console.log('GetEnd!');
        return Response.json(response)
    }
    catch(err){
        console.log("エラーが発生しました。", err)
        const response = {
            statusCode: 500,
            body: {
                "result": "1",
                "errorCode": "200"
            }
        }
        return Response.json(response)
    }
}

export async function POST(request: NextRequest) {
    console.log("Post Start..")
    // const token = request.cookies.get('token')
    // const headersList = headers()
    // const referer = headersList.get('referer')
    // const requestHeaders = new Headers(request.headers)

    // const searchParams = request.nextUrl.searchParams
    // const query = searchParams.get('query')
    // // query is "hello" for /api/search?query=hello

    // const res = await request.json()
    
    // const formData = await request.formData()
    // const email = formData.get('email')


    try {
        if (!request.body) {
            const response = {
                statusCode: 500,
                body: {
                    "result": "1",
                    "errorCode": "100"
                }
            }
            return Response.json(response)
        }

        // POSTされたJSONをそのままDBに格納する。
        const insertJson = request.body
        console.log("req.body=", request.body)

        // MySQL接続情報をSecretManagerから取得
        // const secret_name = "devMySQLUserOsaka";
        // const client = new SecretsManagerClient({
        //     region: "ap-northeast-3",
        // })
        // const secretRes = await client.send(
        //     new GetSecretValueCommand({
        //         SecretId: secret_name,
        //         VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        //     })
        // )
        // const secret = secretRes.SecretString
        // const secretJson = secret ? JSON.parse(secret) : {}
        // const connection = mysql.createConnection({
        //     //host: 'localhost', // DEBUG for Local
        //     host: secretJson.host,
        //     user: secretJson.username,
        //     password: secretJson.password,
        //     database: 'post1'
        // });
        const currentDate = new Date().toISOString()
        console.log("Connect start... currentDate", currentDate)

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'user2',
            password: '',
            database: 'post1'
        })
        // JSON形式でDBに格納
        const query = 'INSERT INTO ekyc2 (ekyc) values (?)'
        const result = connection.query(query, insertJson);
        console.log('データが挿入されました！');

        const response = {
            statusCode: 200,
            body: {
                "result": "0", 
                "errorCode": ""
            }
        }
        return Response.json(response)
    }
    catch(err){
        console.log("エラー発生!", err)
        const response = {
            statusCode: 500,
            body: {
                "result": "1",
                "errorCode": "200"
            }
        }
        return Response.json(response)
    }
}

// ■413 Body exceeded 1mb limit · Issue #53087 · vercel/next.js
// https://github.com/vercel/next.js/issues/53087
//export const config = {
//    api: {
//        bodyParser: {
//            sizeLimit: '20mb',
//        },
//    },
//}
