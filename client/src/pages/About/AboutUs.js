import React from "react";
import classes from "./About.module.css";
import img1 from "./Akash.jpg";
import img2 from "./mahantesht.jpg";
import img3 from "./Bharat.jpg";
const AboutUs = () => {
  return (
    <section className={` p-10 bg-slate-100 ${classes["about-us"]}`}>
      <header>
        <h1 className=" font-bold text-xl mb-2">About Our Bookstore</h1>
      </header>
      <main>
        <p1>
          Welcome to our bookstore! We are a team of book lovers who believe in
          the power of reading. Our mission is to provide a wide variety of
          books to cater to the diverse tastes of our customers. We are
          dedicated to providing excellent service and creating a welcoming
          environment for all book enthusiasts.
        </p1>

        <div className={classes.container}>
          <h2>Meet Our Team</h2>
          <div className={classes.row}>
            <div className={classes.col}>
              <img src={img1} width="150" height="150" alt="Akash" />
              <h3>Name: Akash </h3>
              <p>
                With his keen eye for detail, ensures that every book on our
                platform is of the highest quality.
              </p>
            </div>
            <div className={classes.col}>
              <img src={img2} width="150" height="150" alt="Mahantesh" />
              <h3>Mahantesht</h3>
              <p>
                Our tech wizard, keeps our website running smoothly, ensuring a
                seamless browsing experience for our customers.
              </p>
            </div>
            <div className={classes.col}>
              <img src={img3} width="150" height="150" alt="Bharat" />
              <h3>Bharat</h3>
              <p>
                With her deep understanding of literature, curates the books,
                ensuring a wide variety of genres are represented.
              </p>
            </div>
          </div>
        </div>
      </main>
      <div className="mt-[-12rem]">
        <h2 className=" mb-5 font-bold text-xl">Our Mission</h2>
        <p>
          At our bookstore, our mission is to inspire and nurture the human
          spirit with every book that a customer opens. We believe in the
          transformative power of literature. We aim to foster a global reading
          community where everyone has access to the books they need and love.
          We are committed to providing our customers with a diverse selection
          of high-quality books, exceptional customer service, and a welcoming
          space for all readers. We strive to enrich minds, empower individuals,
          and bring people together, one book at a time. We believe that every
          page turned can bring a new perspective and change the world for the
          better. This is our passion, our purpose, and our promise to you.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
