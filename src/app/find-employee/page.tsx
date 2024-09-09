import { Container, Icons, Wrapper } from "@/components";
import HunterEmailFinder from "@/components/email/HunterEmail";

const Page = () => {
  return (
    <section className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8">
      <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <Container>
          <div className="flex flex-col items-center justify-center relative w-full text-center">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl lg:!leading-snug font-semibold mt-8">
              The Secret Sauce to Networking: <br /> Find Any Email in Seconds &
              Seal the Deal!
            </h2>

            <HunterEmailFinder />
          </div>
        </Container>
      </Wrapper>
    </section>
  );
};

export default Page;
