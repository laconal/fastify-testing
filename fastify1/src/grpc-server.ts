// import * as grpc from '@grpc/grpc-js';
// import * as protoLoader from '@grpc/proto-loader';

// const packageDef = protoLoader.loadSync("src/proto/book.proto");
// const proto = grpc.loadPackageDefinition(packageDef) as any;

// const client = new proto.book.BookService(
//   'localhost:3001',
//   grpc.credentials.createInsecure()
// );

// export function grpcCreateBook(title: string, authorID: number): Promise<{ id: number; title: string }> {
//   return new Promise((resolve, reject) => {
//     client.CreateBook({ title, authorID }, (err: any, response: any) => {
//       if (err) {
//         console.error('gRPC error:', JSON.stringify(err, null, 2))
//         reject(err);
//       }
//       else resolve(response);
//     });
//   });
// }