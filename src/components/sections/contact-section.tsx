import Container from "@/src/components/layout/container";
import { contactData } from "@/src/data/contact";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              {contactData.badge}
            </span>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {contactData.title}
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
              {contactData.description}
            </p>

            <div className="mt-8 grid gap-4">
              {contactData.links.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="group rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,24,33,0.9),rgba(11,15,20,0.96))] p-5 transition-all duration-300 hover:border-primary/25 hover:bg-white/[0.03]"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-primary sm:text-base">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,24,33,0.96),rgba(11,15,20,0.98))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  Formulario
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Envíame un mensaje
                </h3>
              </div>

              <div className="hidden h-12 w-12 rounded-2xl border border-primary/15 bg-primary/10 sm:block" />
            </div>

            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-white/30 focus:border-primary/35 focus:bg-white/[0.045]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Correo
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tucorreo@email.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-white/30 focus:border-primary/35 focus:bg-white/[0.045]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Asunto
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Motivo del mensaje"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-white/30 focus:border-primary/35 focus:bg-white/[0.045]"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Cuéntame sobre tu proyecto o idea"
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-white/30 focus:border-primary/35 focus:bg-white/[0.045]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.02]"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}