import React, { useEffect, useState, type FC } from "react";
import { dashboard } from "@wix/dashboard";
import {
  Box,
  Button,
  Card,
  NumberInput,
  Page,
  WixDesignSystemProvider,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import { items, collections } from "@wix/data";

import { COLLECTION_ID, DEFAULT_FEE_AMOUNT, FEE_ID, FEE_NAME } from "../../consts/consts";

const Index: FC = () => {
  const [fee, setFee] = useState(DEFAULT_FEE_AMOUNT);
  const [isLoading, setIsLoading] = useState(true);

  async function saveFee(feeAmount: number) {
    await items.save(COLLECTION_ID, {
      _id: FEE_ID,
      fee: feeAmount,
      title: FEE_NAME,
    });
  }

  const handleSave = async () => {
    try {
      saveFee(fee);

      dashboard.showToast({
        message: "Fee updated successfully",
      });
    } catch (error) {
      console.error("Error saving fee:", error);
      dashboard.showToast({
        message: `Error saving fee ${error}`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    const getFeeAmount = async () => {
      try {
        const cllectionsList = await collections.listDataCollections();
        const isCollection = cllectionsList.collections.find((collection) => {
          return collection._id === COLLECTION_ID;
        });

        if (isCollection) {
          const result = await items.query(COLLECTION_ID).find();

          if (result.items.length > 0) {
            setFee(result.items[0].fee);
          } else {
            saveFee(DEFAULT_FEE_AMOUNT);
          }
        } else {
          await collections.createDataCollection({
            _id: COLLECTION_ID,
            fields: [{ key: "fee", displayName: "Fee", type: collections.Type.NUMBER }],
          });
          saveFee(DEFAULT_FEE_AMOUNT);
        }
      } catch (error) {
        console.error("Getting fee amount error:", error);
        dashboard.showToast({
          message: `Error retrieving fee ${error}`,

          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getFeeAmount();
  }, []);

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header title="Packaging Fee" subtitle="Manage your packaging fee" />
        <Page.Content>
          <Card>
            <Card.Header title="Select Packaging Fee Amount" />
            <Card.Content>
              <Box direction="vertical" gap={4}>
                {isLoading ? (
                  <>Loading fee...</>
                ) : (
                  <NumberInput
                    value={fee}
                    onChange={(value: number) => setFee(value)}
                    name="Fee Amount"
                    prefix="₪"
                    min={0}
                    step={0.01}
                  />
                )}
                <Button onClick={handleSave}>Save Changes</Button>
              </Box>
            </Card.Content>
          </Card>
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default Index;
