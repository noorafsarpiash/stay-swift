import Image from "next/image";
import Search from "./components/search/Search";

export default function Home() {
  return (
    <div>
      <section class="bg-[#F6F3E9] h-screen max-h-screen relative grid place-items-center bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center">
        <div class="container items-center pb-12 ">
          <div class="col-span-7">
            <h1 class="font-bold text-3xl lg:text-5xl my-4 text-center lg:w-8/12 mx-auto">
              Hotel for memorable moments rich in emotions
            </h1>
            <p class="my-2 text-[#5f5e5e] text-center">
              We have 459 rooms spread throuout Indonesia with room standards
              equivalent to 5 star hotels.
            </p>

            <Search />
          </div>
        </div>
      </section>
    </div>
  );
}
