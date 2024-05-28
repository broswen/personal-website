import Image from "next/image";
import data from "./data.json";
import type {Metadata} from "next";

interface Job {
    company: string
    title: string
    location: string
    employmentStart: string
    employmentEnd: string
    details: string[]
}

export const metadata: Metadata = {
    title: "CV",
};

export default function Home() {
  return (
      <main className="">
          <h1 className="text-2xl font-bold mb-4">Experience</h1>
          {
              data.map((job, i) => {
                  return <div key={i}>
                      <h2 className="text-xl font-bold">{job.title}</h2>
                      <h3 className="text-lg">{job.company}</h3>
                      <p className="italic">{job.employmentStart} - {job.employmentEnd}</p>
                      <p className="mb-4">
                          <ul>
                              {
                                  job.details.map(detail => <li key={detail}>{detail}</li>)
                              }
                          </ul>
                      </p>
                  </div>
              })
          }
          <hr className="pb-4"/>

          <h1 className="text-2xl font-bold mb-4">Education</h1>
          <h2 className="text-xl font-bold">Bachelor of Arts: Computer Science</h2>
          <h3 className="text-lg">Gustavus Adolphus College</h3>
          <p className="italic">09/2016 - 06/2020</p>
          <p className="mb-4">
              <ul>
                  <li>Graduate magna Cum Laude</li>
                  <li>Minor in Japanese Studies</li>
              </ul>
          </p>
          <hr className="pb-4"/>

          <h1 className="text-2xl font-bold mb-4">Certifications</h1>
          <p className="mb-4">
              <ul>
                  <li>AWS Certified Developer - Associate (DVA)</li>
                  <li>HashiCorp Certified: Terraform Associate</li>
              </ul>
          </p>
      </main>
  );
}
