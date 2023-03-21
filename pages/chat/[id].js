import LayoutMain from "@/core/layouts/LayoutMain";
import Chat from "@/screens/chat/index";

const ChatIdPage = ({ params }) => (
	<LayoutMain params={params}>
		<Chat params={params} />
	</LayoutMain>
);

export const getServerSideProps = async (ctx) => ({
	props: {
		params: ctx.params,
	},
});

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
