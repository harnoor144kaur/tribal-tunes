import contact from "../assets/contact-us.png"

const locations = [
    {
      title: 'Arpit Kashyap',
      contact: '8743859690',
      address: "VIT Bhopal",
    },
    
  ]

export const ContactUs = () => {

    return (
        <div>
        <div className="rounded-lg bg-[#f5f5dc]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="py-20">
            <div className="grid grid-cols-1 gap-x-20 gap-y-8 lg:grid-cols-2">
              <div className="space-y-4">
                <p className="w-full text-4xl font-bold text-gray-900">Contact Us</p>
                <img src={contact} alt="" />
              </div>
              <div className="space-y-4 divide-y-2">
                {locations.map((location) => (
                  <div
                    key={location.title}
                    className="flex flex-col space-y-2 pt-4 first:pt-0 lg:w-full"
                  >
                    <p className="w-full text-xl font-semibold  text-gray-900">{location.title}</p>
                    <p className="w-full text-base  text-gray-600">{location.contact}</p>
                    <p className="text-sm font-semibold text-gray-600">{location.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-6" />
</div>
    );
};