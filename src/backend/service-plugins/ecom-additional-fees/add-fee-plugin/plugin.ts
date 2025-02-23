import { additionalFees } from "@wix/ecom/service-plugins";
import {
  COLLECTION_ID,
  CURRENCY,
  DEFAULT_FEE_AMOUNT,
  FEE_CODE,
  FEE_ID,
  FEE_NAME,
} from "../../../../consts/consts";
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
