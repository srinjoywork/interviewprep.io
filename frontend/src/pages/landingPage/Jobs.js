import JobBoard from "components/tesetjob/JobBoard";
import Banner from "components/Banner";

export default function Jobs() {
  return (
    <div className=" bg-[#1d2661] text-center">
      <JobBoard title={true} />
      <Banner
        title="Want to post your own jobs?"
        button="Post a job"
        link="/sign-up/new-company"
      />
    </div>
  );
}
