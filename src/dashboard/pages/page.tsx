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

import {
  DEFAULT_FEE_AMOUNT,
  COLLECTION_ID,
  COLLECTION_NAME,
  FEE_ID,
  FEE_NAME,
  FEE_KEY,
} from "../../consts/consts";

const Index: FC = () => {
  const [fee, setFee] = useState(DEFAULT_FEE_AMOUNT);
  const [isLoading, setIsLoading] = useState(true);

  const handleSave = async () => {
    try {
      await items.save(COLLECTION_ID, {
        _id: FEE_ID,
        fee: fee,
      });
      dashboard.showToast({
        message: "Fee updated successfully",
      });
    } catch (error) {
      console.error("Error saving fee:", error);
      dashboard.showToast({
        message: "Error saving fee",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const setupCollection = async () => {
      try {
        const existingCollections = await collections.listDataCollections();
        const packagingFeeExists = existingCollections.collections.some(
          (collection) => collection._id === COLLECTION_ID
        );

        if (!packagingFeeExists) {
          await collections.createDataCollection({
            _id: COLLECTION_ID,
            displayName: COLLECTION_NAME,
            fields: [
              {
                displayName: FEE_NAME,
                key: FEE_KEY,
                type: collections.Type.NUMBER,
              },
            ],
          });

          await items.save(COLLECTION_ID, {
            _id: FEE_ID,
            fee: DEFAULT_FEE_AMOUNT,
          });
        }

        const result = await items.get(COLLECTION_ID, FEE_ID);

        if (result) {
          setFee(result.fee);
        }
      } catch (error) {
        console.error("Collection Setup error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setupCollection();
  }, []);

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header title="Packaging Fee" subtitle="Manage your packaging fee" />
        <Page.Content>
          <Card>
            <Card.Header title="Select Additional Fee Amount" />
            <Card.Content>
              <Box direction="vertical" gap={4}>
                {isLoading ? (
                  <>Loading fee...</>
                ) : (
                  <NumberInput
                    value={fee}
                    onChange={(value: number) => setFee(value)}
                    name="Fee Amount"
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
