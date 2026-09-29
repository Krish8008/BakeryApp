import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

function Contact() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf7] text-[#38231f]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#4c2626] px-5 py-16 text-[#fffaf7] md:py-20">

        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#db8b64]/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#f5c997]/15 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">

          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f8d6af]/30 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-[#f8d6af]">
            <Mail size={13} />
            Get In Touch
          </span>

          <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Let's make your
            <br />
            celebration sweeter.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#f9e8d9]/80 md:text-lg">
            Have a question, custom cake idea, or special request?
            We'd love to hear from you.
          </p>

        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-18">

        <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">

          {/* CONTACT INFORMATION */}
          <div className="rounded-3xl border border-[#eadbd1] bg-white p-6 shadow-sm md:p-7">

            <div className="mb-7">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#b45d45]">
                Contact Details
              </p>

              <h2 className="font-serif text-3xl font-semibold">
                Get in touch
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#7d6259]">
                We're happy to help with orders, custom cakes, and any
                questions you may have.
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4">

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff1e5] text-[#9b4d39]">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#8a7168]">
                    Phone
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-[#38231f]">
                    +91 2X2X2X2X2
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff1e5] text-[#9b4d39]">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#8a7168]">
                    Email
                  </p>

                  <p className="mt-0.5 break-all text-sm font-medium text-[#38231f]">
                    cakesbysnehal@gmail.com
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff1e5] text-[#9b4d39]">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#8a7168]">
                    Location
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-[#38231f]">
                    Nagpur, Maharashtra, India
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff1e5] text-[#9b4d39]">
                  <Clock3 size={18} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#8a7168]">
                    Working Hours
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-[#38231f]">
                    Mon - Sun · 9:00 AM - 9:00 PM
                  </p>
                </div>
              </div>

            </div>

            

          </div>

          {/* CONTACT FORM */}
          <div className="rounded-3xl border border-[#eadbd1] bg-white p-6 shadow-sm md:p-7">

            <div className="mb-6">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#b45d45]">
                Send a Message
              </p>

              <h2 className="font-serif text-3xl font-semibold">
                Tell us what you need
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#7d6259]">
                Share your requirements and we'll help you plan the perfect
                cake.
              </p>
            </div>

            <form
              action="mailto:cakesbysnehal@gmail.com"
              method="post"
              encType="text/plain"
              className="space-y-4"
            >

              {/* Name */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#765f58]">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf7] px-4 py-3 text-sm text-[#38231f] outline-none transition placeholder:text-[#a28c84] focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#765f58]">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf7] px-4 py-3 text-sm text-[#38231f] outline-none transition placeholder:text-[#a28c84] focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#765f58]">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf7] px-4 py-3 text-sm text-[#38231f] outline-none transition placeholder:text-[#a28c84] focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#765f58]">
                  Message
                </label>

                <textarea
                  rows="5"
                  name="message"
                  placeholder="Tell us about your cake requirement..."
                  required
                  className="w-full resize-none rounded-xl border border-[#eadbd1] bg-[#fffaf7] px-4 py-3 text-sm text-[#38231f] outline-none transition placeholder:text-[#a28c84] focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9b4d39] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#773d33] focus:outline-none focus:ring-2 focus:ring-[#f8d6af] focus:ring-offset-2"
              >
                <Send size={16} />
                Open Email to Send
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#4c2626] px-5 py-14 text-[#fffaf7] md:py-16">

        <div className="mx-auto max-w-3xl text-center">

          <span className="mb-3 inline-flex items-center gap-2 text-sm text-[#f8d6af]">
            <CakeSliceIcon />
            Let's create something special
          </span>

          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            Ready to order your dream cake?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#f9e8d9]/75">
            Contact us today and let us create the perfect cake for your
            special occasion.
          </p>

          <a
            href="https://www.instagram.com/cakes_by_snehal_/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f8d6af] px-5 py-2.5 text-sm font-bold text-[#4c2626] transition hover:bg-white"
          >
            Order Now
            <ArrowRight size={15} />
          </a>

        </div>
      </section>

    </main>
  );
}

function CakeSliceIcon() {
  return <span className="text-[#f8d6af]">✦</span>;
}

export default Contact;