import { additionalFees } from "@wix/ecom/service-plugins";
import {
  COLLECTION_ID,
  CURRENCY,
  DEFAULT_FEE_AMOUNT,
  FEE_CODE,
  FEE_NAME,
} from "../../../../consts/consts";
import { items } from "@wix/data";
import { auth } from "@wix/essentials";

additionalFees.provideHandlers({
  calculateAdditionalFees: async ({ request, metadata }) => {
    try {
      const elevatedItemsQuery = auth.elevate(items.query);
      const feeResults = await elevatedItemsQuery(COLLECTION_ID).find();

      const fee = feeResults ? feeResults.items[0].fee : DEFAULT_FEE_AMOUNT;
      return {
        additionalFees: [
          {
            code: FEE_CODE,
            name: FEE_NAME,
            price: fee.toString(),
            taxDetails: {
              taxable: false,
            },
          },
        ],
        currency: CURRENCY,
      };
    } catch (error) {
      console.log("error getting the fees and currency ", error);
      return { additionalFees: [] };
    }
  },
});
