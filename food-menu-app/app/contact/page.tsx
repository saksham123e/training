import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const channels = [
  {
    icon: <Mail aria-hidden="true" size={22} />,
    label: "Email",
    value: "hello@maison.example",
  },
  {
    icon: <Phone aria-hidden="true" size={22} />,
    label: "Concierge",
    value: "+91 98765 43210",
  },
  {
    icon: <MapPin aria-hidden="true" size={22} />,
    label: "Kitchen",
    value: "Bandra West, Mumbai",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[#0B0B0C] px-6 py-20">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase text-[#FFA94D]">
            Contact
          </p>
          <h1 className="font-serif text-6xl leading-tight text-white md:text-7xl">
            Talk to the kitchen concierge.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#B5B5B5]">
            Questions about orders, partnerships, or menu drops? Send a note and
            the Maison team will route it quickly.
          </p>
        </div>

        <div className="glass-panel rounded-[2rem] p-6 md:p-8">
          <div className="mb-7 flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-[#FF6B00]/15 text-[#FFA94D]">
              <MessageCircle aria-hidden="true" size={22} />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-white">Get in touch</h2>
              <p className="text-sm text-[#B5B5B5]">Usually replies same day</p>
            </div>
          </div>

          <div className="grid gap-4">
            {channels.map((channel) => (
              <div
                key={channel.label}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="mb-4 text-[#FFA94D]">{channel.icon}</div>
                <p className="text-sm text-[#B5B5B5]">{channel.label}</p>
                <p className="mt-1 font-semibold text-white">{channel.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
