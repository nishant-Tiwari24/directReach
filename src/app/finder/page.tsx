import React from "react";

const companies = [
  {
    name: "Metastart",
    email: "talent@metastart.in",
    linkedin: "https://linkedin.com/company/metastart",
  },
  {
    name: "Userfindr",
    email: "utkarsh@usefindr.com",
    linkedin: "https://linkedin.com/company/userfindr",
  },
  {
    name: "Astrotalk",
    email: "debasmita.roy@astrotalk.com",
    linkedin: "https://linkedin.com/company/astrotalk",
  },
  {
    name: "Humantic AI",
    email: "talent@humantic.ai",
    linkedin: "https://linkedin.com/company/humantic-ai",
  },
  {
    name: "Medstown",
    email: "support@medstown.com",
    linkedin: "https://linkedin.com/company/medstown",
  },
  {
    name: "Zyod",
    email: "aman.jha@zyod.com",
    linkedin: "https://linkedin.com/company/zyod",
  },
  {
    name: "Groww",
    email: "future@groww.in",
    linkedin: "https://linkedin.com/company/groww",
  },
  {
    name: "Infosys",
    email: "amruta.deshpande1610@gmail.com",
    linkedin: "https://linkedin.com/company/infosys",
  },
  {
    name: "Antler(Singapore)",
    email: "tandavkrishna27@gmail.com",
    linkedin: "https://linkedin.com/company/antler",
  },
  {
    name: "EatFit",
    email: "rakshita@eatfit.in",
    linkedin: "https://linkedin.com/company/eatfit",
  },
  {
    name: "Fixerra",
    email: "careers@fixerra.in",
    linkedin: "https://linkedin.com/company/fixerra",
  },
  {
    name: "Cars24",
    email: "swapnil.mishra@cars24.com",
    linkedin: "https://linkedin.com/company/cars24",
  },
  {
    name: "Volt Money",
    email: "ankita.singh@voltmoney.in",
    linkedin: "https://linkedin.com/company/voltmoney",
  },
  {
    name: "Blance",
    email: "pankaj@blance.in",
    linkedin: "https://linkedin.com/company/blance",
  },
  {
    name: "Meesho",
    email: "himanshubarak@gmail.com",
    linkedin: "https://linkedin.com/company/meesho",
  },
  {
    name: "DataZip",
    email: "piyushsingariya@datazip.io",
    linkedin: "https://linkedin.com/company/datazip",
  },
  {
    name: "Textrai",
    email: "founders@textrai.com",
    linkedin: "https://linkedin.com/company/textrai",
  },
  {
    name: "Tophire",
    email: "ipitha.km@tophire.co",
    linkedin: "https://linkedin.com/company/tophire",
  },
  {
    name: "Cypherock",
    email: "atul.nandan@cypherock.com",
    linkedin: "https://linkedin.com/company/cypherock",
  },
  {
    name: "Zluri",
    email: "mamta.s@zluri.com",
    linkedin: "https://linkedin.com/company/zluri",
  },
  {
    name: "Third Unicorn",
    email: "rahul@third-unicorn.com",
    linkedin: "https://linkedin.com/company/third-unicorn",
  },
  {
    name: "Juspay",
    email: "miskin.shravani@juspay.in",
    linkedin: "https://linkedin.com/company/juspay",
  },
  {
    name: "Flipkart",
    email: "abhinavsingh.k@flipkart.com",
    linkedin: "https://linkedin.com/company/flipkart",
  },
  {
    name: "Hotstar",
    email: "chaitrashree.hegde.con@hotstar.com",
    linkedin: "https://linkedin.com/company/hotstar",
  },
  {
    name: "Oyo",
    email: "shubhi.verma@oyorooms.com",
    linkedin: "https://linkedin.com/company/oyo",
  },
  {
    name: "Paypal",
    email: "ravi.shankar@piramal.com",
    linkedin: "https://linkedin.com/company/paypal",
  },
  {
    name: "Physics Wallah",
    email: "prakriti.goel@pw.live",
    linkedin: "https://linkedin.com/company/physicswallah",
  },
  {
    name: "PhonePe",
    email: "shivani.sahraot@phonepe.com",
    linkedin: "https://linkedin.com/company/phonepe",
  },
  {
    name: "Zepto",
    email: "priyanka.deshmukh@zeptonow.com",
    linkedin: "https://linkedin.com/company/zepto",
  },
  {
    name: "Qyuicklend",
    email: "jobs@quicklend.in",
    linkedin: "https://linkedin.com/company/quicklend",
  },
  {
    name: "Demand Farm",
    email: "saakshi.haribhat@demandfarm.com",
    linkedin: "https://linkedin.com/company/demandfarm",
  },
];

const Page = () => {
  return (
    <section className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-12">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
          Top Recruit Companies and Employee Names
        </h1>
        <table className="min-w-full text-left">
          <thead>
            <tr className="">
              <th className="py-2 px-4 text-base font-semibold text-gray-200">
                Company Name
              </th>
              <th className="py-2 px-4 text-base font-semibold text-gray-200">
                Email
              </th>
              <th className="py-2 px-4 text-base font-semibold text-gray-200">
                LinkedIn Profile
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index} className="">
                <td className="py-2 px-4 text-base text-gray-400">
                  {company.name}
                </td>
                <td className="py-2 px-4 text-base text-gray-400">
                  {company.email}
                </td>
                <td className="py-2 px-4 text-base text-blue-400">
                  <a
                    href={company.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Page;
