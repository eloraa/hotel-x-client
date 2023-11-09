import moment from 'moment';
import { useLoaderData } from 'react-router-dom';
import { Button } from '../utils/Button';

export const Careers = () => {
  const data = useLoaderData();
  return (
    <div className="md:px-10 px-5 py-12 [background:linear-gradient(0deg,rgba(11,11,18,0.10)_0%,rgba(11,11,18,0.08)_75.19%,rgba(11,11,18,0.00)_96.88%)]">
      <h1 className="text-4xl font-bold uppercase">Career opportunity</h1>

      <div className="mt-24 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {data && data.length
          ? data.map(career => (
              <div key={career._id} className="px-8 py-10 bg-white rounded-lg flex flex-col gap-8">
                <h1 className="font-semibold">{career.job_title}</h1>
                <p>{career.job_description}</p>
                <div className='mt-auto text-sm'>
                  <div className="flex items-center justify-between font-semibold pb-6">
                    <h4>Deadline</h4>
                    <h1>{career.deadline}</h1>
                  </div>
                  <div className="flex items-center justify-between border-t border-dark-white pt-6">
                    <p>{moment(career.posted_date).fromNow()}</p>
                    <Button offset={true} className="gap-2">
                      <span className="capitalize">Apply</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          : 'No job field available right now. Stay touched'}
      </div>
    </div>
  );
};
