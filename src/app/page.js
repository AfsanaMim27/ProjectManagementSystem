import { Kanit } from "next/font/google";
import GlobalBar from "./components/globalBar";
const kanitFont = Kanit({ weight: "900", subsets: ["latin"] });
export default function Home() {
  return (
    <div>
      <GlobalBar isPublic></GlobalBar>
      <div className="pt-5">
      <div className="mt-5 pt-5">
          <div className="row justify-content-center">
            <div className="col-8 text-center">
              <h1 className={kanitFont.className}>
                Project Management Software
              </h1>
              <p className="pt-3 px-5 mx-5">
                Manage projects, finances and resources in a single system to
                boost profitability, standardize operations, and optimize team
                utilization. Built for consultancies, agencies and other
                professional services businesses for ultimate visibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
