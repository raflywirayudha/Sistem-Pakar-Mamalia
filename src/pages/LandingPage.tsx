import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <header className="dark:bg-secondaryBlack inset-0 flex min-h-screen w-full flex-col items-center justify-center bg-yellowbg bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <div className="mx-auto w-container max-w-full px-5 py-[110px] text-center lg:py-[150px]">
        <h1 className="text-3xl font-heading md:text-4xl lg:text-5xl">
          Sistem Pakar Mamalia
        </h1>
        <img
          src="/yey.png"
          alt="yey"
          className="mt-10 w-64 h-auto mx-auto animate-bounceUpDown"
        />
        <p className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
          By <span className="font-bold">RASCHWALTH 😈</span>
        </p>
        <Button
          size="lg"
          onClick={handleClick}
          className="h-12 w-64 text-base font-heading md:text-lg lg:h-14 lg:text-xl rounded-full"
        >
          Mulai
        </Button>
      </div>
    </header>
  );
}
