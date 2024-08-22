import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const Home: React.FC = () => {
  return (
    <div>
           <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <Navbar />
      <section className="flex flex-col-reverse md:flex-row items-center justify-between p-6 md:p-12 md:h-[85vh] bg-white">
        <div className="text-center md:text-left md:w-1/2 flex flex-col space-y-5 items-center md:items-start">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#55B5DE]">Empower</span> Your <br/>
            Education, <span className="text-[#55B5DE]">Elevate</span> Your Learning Journey
          </h1>
          <p className="text-gray-700">
            The Ultimate Collaboration Hub for Students and Lecturers to Expand Knowledge and Sharpen Skills.
          </p>
          <Link href={"/auth/signup"} className='bg-[#55B5DE] text-white px-6 py-3 rounded-full font-bold w-fit hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400'>
            Get Started
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <div className="relative border-2 border-[#55B5DE] rounded-full p-3 ">
            <div className="bg-[#55B5DE] rounded-full">
              <Image 
                src={"/images/smw1.png"}
                alt='smw1'
                width={400}
                height={400}
                className='rounded-full w-[400px] md:h-[400px]'
              />
            </div>
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
              <div className="bg-pink-500 rounded-full w-4 h-4 md:w-6 md:h-6"></div>
            </div>
            <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
              <div className="bg-orange-500 rounded-full w-6 h-6 md:w-8 md:h-8"></div>
            </div>
            <div className="absolute bottom-0 left-0 transform -translate-y-1/2 -translate-x-1/2">
              <div className="bg-blue-500 rounded-full w-4 h-4 md:w-6 md:h-6"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-around">
          <div className="flex flex-col md:flex-row space-x-2 items-center mb-8 md:mb-0">
            <div className="bg-blue-400 p-4 rounded-xl mb-4">
              <Image
                src={"/images/resources.png"}
                alt='resources'
                width={50}
                height={50}
              />
            </div>
            <div className='flex flex-col items-center md:items-start'>
              <h3 className="text-xl font-bold">1K+</h3>
              <p className="text-gray-700">Resources</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-x-2 items-center mb-8 md:mb-0">
            <div className="bg-yellow-400 p-4 rounded-xl mb-4">
              <Image
                src={"/images/questions.png"}
                alt='resources'
                width={50}
                height={50}
              />
            </div>
            <div className='flex flex-col items-center md:items-start'>
              <h3 className="text-xl font-bold">500+</h3>
              <p className="text-gray-700">Past Questions</p>
            </div>
          </div><div className="flex flex-col md:flex-row space-x-2 items-center mb-8 md:mb-0">
            <div className="bg-pink-400 p-4 rounded-xl mb-4">
              <Image
                src={"/images/universities.png"}
                alt='resources'
                width={50}
                height={50}
              />
            </div>
            <div className='flex flex-col items-center md:items-start'>
              <h3 className="text-xl font-bold">100+</h3>
              <p className="text-gray-700">Universities</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 bg-white" id='about'>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0">
            <div className="relative border-2 border-[#55B5DE] rounded-full p-3 ">
              <div className="bg-yellow-500 rounded-full">
                <Image 
                  src={"/images/man1.png"}
                  alt='smw1'
                  width={300}
                  height={300}
                  className='rounded-full w-[300px] md:h-[300px]'
                />
              </div>
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                <div className="bg-pink-500 rounded-full w-4 h-4 md:w-6 md:h-6"></div>
              </div>
              <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
                <div className="bg-orange-500 rounded-full w-6 h-6 md:w-8 md:h-8"></div>
              </div>
              <div className="absolute bottom-0 left-0 transform -translate-y-1/2 -translate-x-1/2">
                <div className="bg-blue-500 rounded-full w-4 h-4 md:w-6 md:h-6"></div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-blue-400">About Us</span> 
            </h2>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum at voluptatum eius fugiat dolor, ipsa iste impedit exercitationem molestias quia.
            </p>
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, cupiditate quos. Earum eaque corporis aperiam harum perspiciatis beatae adipisci itaque!
            </p>
            <Link href={"#"} className='bg-blue-400 text-white px-6 py-3 rounded-full font-bold'>Read More</Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-white md:px-12" id='services'>
        <div className="container mx-auto px-6 flex flex-col items-center jsutify-between md:flex-row">
          <div className="md:w-1/2 flex flex-col justify-center md:justify-start mb-8 md:mb-0">
            <Image 
              src={"/images/woman.png"}
              alt="Woman with a laptop"
              width={500}
              height={300}
              className='rounded-lg'
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-4">
                Explore 1K+ Free <span className="text-blue-400">Online Resources</span>
              </h2>
              <p className="text-gray-700 mb-6">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, obcaecati. Molestiae impedit eaque perspiciatis ut itaque? Vel molestiae veritatis dicta?
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
              <div className="flex flex-col items-center md:items-start">
                <div className="bg-blue-400 rounded-lg p-4">
                  <Image 
                    src={"/images/resources.png"}
                    alt='resources'
                    width={50}
                    height={50}
                  />
                </div>
                <p className="text-gray-700 mt-2">Upload Materials</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="bg-yellow-400 rounded-lg p-4">
                  <Image 
                    src={"/images/questions.png"}
                    alt='questions'
                    width={50}
                    height={50}
                  />
                </div>
                <p className="text-gray-700 mt-2">Access Past Questions</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="bg-pink-400 rounded-lg p-4">
                  <Image 
                    src={"/images/universities.png"}
                    alt='resources'
                    width={50}
                    height={50}

                  />
                </div>
                <p className="text-gray-700 mt-2">Study Resources</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="bg-green-400 rounded-lg p-4">
                  <Image 
                    src={"/images/universities.png"}
                    alt='resources'
                    width={50}
                    height={50}

                  />
                </div>
                <p className="text-gray-700 mt-2">Open Source Collaboration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 md:py-12 bg-blue-300">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-2xl font-bold mb-8 text-white">Testimonial</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Image 
                  src="/images/user.png" // Replace with the correct path to your image
                  alt="Testimonial 1"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-blue-500 font-bold">Darkness</h3>
                  <p className="text-gray-500">Harvard</p>
                  <p className="text-yellow-500">★★★★★</p>
                </div>
              </div>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Image 
                  src="/images/user.png" // Replace with the correct path to your image
                  alt="Testimonial 2"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-blue-500 font-bold">Izzy</h3>
                  <p className="text-gray-500">Oxford</p>
                  <p className="text-yellow-500">★★★★★</p>
                </div>
              </div>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 md:py-12 bg-white" id='contact'>
        <div className="container mx-auto px-6 flex">
          <div className="w-full md:w-1/2">
            <h2 className="text-center md:text-left text-2xl font-bold mb-8 text-blue-500">Send us a message</h2>
            <form className="w-full max-w-lg mx-auto md:mx-0">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-first-name"
                    type="text"
                    placeholder="Enter Full Name"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-email"
                    type="email"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-subject">
                    Subject
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-subject"
                    type="text"
                    placeholder="Subject"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-message">
                    Message
                  </label>
                  <textarea
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-message"
                    placeholder="Message"
                    rows={5}
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline" type="button">
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className="hidden md:flex w-1/2">
            <Image 
              src="/images/student.png"
              alt="Contact Us"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home;
