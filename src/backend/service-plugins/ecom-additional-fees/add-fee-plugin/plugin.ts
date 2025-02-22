import { additionalFees } from "@wix/ecom/service-plugins";
import { COLLECTION_ID, DEFAULT_FEE_AMOUNT, FEE_ID } from "../../../../consts/consts";
import { items } from "@wix/data";
import { auth } from "@wix/essentials";

additionalFees.provideHandlers({
  calculateAdditionalFees: async ({ request, metadata }) => {
    try {
      const elevatedItemsGet = auth.elevate(items.get);
      const feeResults = await elevatedItemsGet(COLLECTION_ID, FEE_ID);
      const fee = feeResults ? feeResults.fee : DEFAULT_FEE_AMOUNT;
      return {
        additionalFees: [
          {
            code: "packaging-fee",
            name: "Packaging Fee",
            price: fee.toString(),
            taxDetails: {
              taxable: false,
            },
          },
        ],
        currency: "ILS",
      };
    } catch (error) {
      console.log("error getting the fees", error);
      return { additionalFees: [] };
    }
  },
});
