import { useState } from "react";
// import { TextInput } from "../Components/Inputs";
import { BsSendCheckFill } from "react-icons/bs";
import { TextInput } from "./Inputs";

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, email, phone, object, message };
    alert(JSON.stringify(data));
  };

  return (
    <div className="container py-20 bg-white">
      <div className="w-full flex flex-col-reverse md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.767732453225!2d9.748921511268403!3d4.067691546801334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610d05dac28ccb%3A0x6ffa00a829067eb!2sCarrefour%20BIFAGA!5e0!3m2!1sfr!2scm!4v1689645008870!5m2!1sfr!2scm"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit}>
            <h2 className="font-semibold text-2xl text-gray-700">
              Envoyer un message
            </h2>
            <div className="flex flex-col gap-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3 md:gap-y-6">
                <TextInput
                  placeholder="Nom et prénom *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                />
                <TextInput
                  placeholder="Email *"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
                <TextInput
                  placeholder="Téléphone *"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={true}
                />
                <TextInput
                  placeholder="Object *"
                  value={object}
                  onChange={(e) => setObject(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Entrer votre message ici ..."
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}
                  id=""
                  className="animation duration-300 placeholder:text-md placeholder:font-thin border-[1px] rounded-md px-3 py-2 border-primary/30 focus:border-primary/60 outline-none w-full"
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
            </div>
            <div>
              <button className="bg-blue-950 p-4 px-6 w-full mt-4 rounded-md text-white flex items-center justify-center gap-6 animation duration-200 border-blue-950 border-[2px] hover:bg-white hover:text-blue-950">
                Envoyez votre message
                <span>
                  <BsSendCheckFill />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
