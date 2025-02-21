import React, { useState, type FC } from "react";
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

const DEFAULT_FEE = 0;

const Index: FC = () => {
  const [fee, setFee] = useState(DEFAULT_FEE);

  const handleSave = () => {
    console.log("Saving new fee:", fee);
    dashboard.showToast({
      message: "Fee updated successfully",
    });
  };
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header title="Packaging Fee" subtitle="Manage your packaging fee" />
        <Page.Content>
          <Card>
            <Card.Header title="Select Additional Fee Amount" />
            <Card.Content>
              <Box direction="vertical" gap={4}>
                <NumberInput
                  value={fee}
                  onChange={(value: number) => setFee(value)}
                  name="Fee Amount"
                  min={0}
                  step={0.01}
                />
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
