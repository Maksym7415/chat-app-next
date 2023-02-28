import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";
import Chat from "@/screens/chat/index";
import { wrapper, persistor } from "@/store/store";

const ChatIdPage = (props) => {
  return (
    <LayoutMain params={props.params}>
      <Chat params={props.params} />
    </LayoutMain>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    console.time(ctx.params?.id, "Time this"); // при старті може бути 70ms  при переході на інший чат до 47ms без запиту 0.004 ms, більше

    const redirectToken = await checkIsToken(ctx);

    if (redirectToken) {
      return redirectToken;
    }

    console.timeEnd(ctx.params?.id, "Time this END");
    console.log(store.getState().persistSlice, "------------persistSlice");

    return {
      props: {
        params: ctx.params,
        initialReduxState: store.getState(),
      },
    };
  }
);

// TEST

// export const getStaticPaths = async (context) => {
//   console.log(context, "context");
//   return {
//     paths: [{ params: { id: "12" } }],
//     fallback: "blocking",

//     // props: {
//     //   params: { id: 0 },
//     // },
//   };
// };

// export const getStaticProps = async (ctx) => {
//   console.log(ctx, "ctx");
//   // const redirectToken = checkIsToken(ctx);

//   // if (redirectToken) {
//   //   return redirectToken;
//   // }

//   // const {  } = await getInitialData(ctx, store);

//   // console.time(ctx.params?.id, "Time this"); // при старті може бути 70ms  при переході на інший чат до 47ms без запиту 0.004 ms, більше

//   // const additionalUrl = ctx.params?.id ? `${ctx.params?.id}` : null;
//   // const params = { offset: 0 };

//   // await getConversationMessagesQuery({
//   //   params,
//   //   cookies: ctx.req?.cookies,
//   //   additionalUrl,
//   // });

//   // console.timeEnd(ctx.params?.id, "Time this END");

//   return {
//     props: {
//       params: { id: 0 },
//     },
//   };
// };

export default ChatIdPage;
