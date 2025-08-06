import React from "react";
import { Divider, Grid, GridCol } from "@mantine/core";

const Footer = () => {
  return (
    <footer className="w-full bg-[#6B4633]">
      <div className="w-[90%] container mx-auto relative flex flex-col items-center justify-center gap-8 my-6">
        <div className="w-full">
          <Grid gutter="lg" grow>
            <GridCol span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <div className="text-white">
                <h3 className="text-lg font-semibold mb-4">Column 1</h3>
                <p>Content for first column</p>
              </div>
            </GridCol>
            <GridCol span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <div className="text-white">
                <h3 className="text-lg font-semibold mb-4">Column 2</h3>
                <p>Content for second column</p>
              </div>
            </GridCol>
            <GridCol span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <div className="text-white">
                <h3 className="text-lg font-semibold mb-4">Column 3</h3>
                <p>Content for third column</p>
              </div>
            </GridCol>
            <GridCol span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <div className="text-white">
                <h3 className="text-lg font-semibold mb-4">Column 4</h3>
                <p>Content for fourth column</p>
              </div>
            </GridCol>
          </Grid>
        </div>

        <Divider
          my="md"
          styles={{
            root: {
              borderTopColor: "#D4AF37 !important",
              borderTopWidth: "2px !important",
              opacity: 1,
              width: "100%",
            },
          }}
        />

        <p className="text-center text-[min(10vw,16px)] text-white">
          &copy; {new Date().getFullYear()} Mide&apos;s Atelier
        </p>
      </div>
    </footer>
  );
};

export default Footer;
