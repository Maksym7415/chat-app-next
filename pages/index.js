import { dehydrate } from "react-query";
import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";
import { getInitialData } from "@/core/forSsr/getData";
import { wrapper, fetchSystem } from "@/store/store";
import { setSystemTokenAction } from "@/store/system/slice";

const HomePage = () => {
  return <LayoutMain />;
};

HomePage.isPrivatePage = true;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    // console.log(store.getState(), "store state on the server before dispatch");
    // store.dispatch(setSystemTokenAction("ssss"));
    // console.log(
    //   store.getState().systemSlice,
    //   "11 state on the server before dispatch"
    // );
    // const productData = "page data";
    //  http://localhost:3000/product?data='some-data'
    // await store.dispatch(fetchProduct());
    // console.log("store state on the server after dispatch", store.getState());

    // return {
    //   props: {
    //     // productData,
    //     // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    //   },
    // };

    const redirectToken = checkIsToken(ctx);

    if (redirectToken) {
      return redirectToken;
    }

    const { queryClient } = await getInitialData(ctx, store);
    // store.dispatch(setSystemTokenAction("ssss"));
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  }
);

// export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
//   // console.log(store.getState(), "store state on the server before dispatch");
//   // const productData = "page data";
//   //  http://localhost:3000/product?data='some-data'
//   // await store.dispatch(fetchProduct());
//   // console.log("store state on the server after dispatch", store.getState());

//   // return {
//   //   props: {
//   //     // productData,
//   //     // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//   //   },
//   // };
//   const redirectToken = checkIsToken(ctx);

//   console.log(ctx, "ctx");

//   return {
//     props: {},
//   };
// });

export default HomePage;
