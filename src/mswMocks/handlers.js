import {rest} from 'msw';

// receives a getter function to access response data
export default function createHandlers(getData) {
  const handlers = [
    rest.get("https://geo.ipify.org/api/v1", (req, res, ctx) => {
      return res(
        // ctx.delay(500),
        ctx.status(200, "Succes"),
        ctx.json({
          ...getData()
        })
      );
    })
  ];

  return handlers;
} 
