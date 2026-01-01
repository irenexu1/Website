import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import SectionWrapper from "../components/SectionWrapper";
import { slideIn } from "../motion"


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value} = e.target;
    setForm({ ...form, [name]: value})

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send(
      'servID', 
      'tempID', 
      { 
        from_name: form.name, 
        to_name: 'Irene', 
        from_email: form.email, 
        to_email: 'myemail', 
        message: form.message, },
      'pubID'
    )
    .then(() => {
      setLoading(false);
      alert('Thank you. I will get back to you as soon as possible.');
      setForm({
        name: '',
        email: '',
        message: '',
      })
    }, (error) => {
      setLoading(false)
      console.log(error);
      alert('Something went wrong.')
  })
  }
  
  return (
    <section id="contact" className="px-6 py-16 xl:mt-12 xl:flex-row ml-0 md:ml-20 flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div 
        variants={slideIn('left', "tween", 0.2, 1)}
        className="flex-[0.75] max-w-none md:max-w-3xl bg-slate-900 p-8 rounded-2xl"
      >
        <p className="p-lead"> Get in touch </p>
        <h2>
          Contact
        </h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white text-lg mb-4">Name</span>
            <input 
              type="text" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              placeholder="Your name" 
              className="bg-slate-800 py-4 px-6"
              placeholder:text-p-lead
              text-white rounded-lg outlined-none border-none font-medium />
          </label>

          <label className="flex flex-col">
            <span className="text-white text-lg mb-4">Email</span>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="Your email" 
              className="bg-slate-800 py-4 px-6"
              placeholder:text-p-lead
              text-white rounded-lg outlined-none border-none font-medium />
          </label>

          <label className="flex flex-col">
            <span className="text-white text-lg mb-4">Message</span>
            <textarea 
              rows="7"
              name="message" 
              value={form.message} 
              onChange={handleChange} 
              placeholder="Your Message" 
              className="bg-slate-800 py-4 px-6"
              placeholder:text-p-lead
              text-white rounded-lg outlined-none border-none font-medium />
          </label>

          <button 
            type="submit"
            className="bg-slate-800 py-3 px-8"
            outline-none w-fit text-white font-bold shadow-md shadow-black rounded-xl
          >
              {loading ? 'Sending...' : 'Send'}
          </button>

        </form>

        </motion.div>

    </section>
  );
}

export default SectionWrapper(Contact, "contact");