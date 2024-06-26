import React from 'react';
import Layout from '@/components/Dashboard/Admin/Layout';
import { FaX } from 'react-icons/fa6';
import { toast, Toaster } from 'react-hot-toast';

const Notification: React.FC = () => {
    const [title, setTitle] = React.useState<string>('');
    const [body, setBody] = React.useState<string>('');
    const [showConfirmationModal, setShowConfirmationModal] = React.useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = React.useState<boolean>(false);

    const handleSendNotification = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmationModal(true);
    };

    const handleConfirmSend = async () => {
        setShowConfirmationModal(false);
        // setShowSuccessModal(true);

        const data = {
            title,
            body,
        };

        const response = await fetch('/api/admin/notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (responseData.success) {
            setShowSuccessModal(true);
            setTitle('');
            setBody('');
        } else {
            toast.error(responseData.message);
        }
    }

  return (
    <Layout>
        <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold text-blue-500">Push Notification</h1>
            <form 
                className="flex flex-col border border-gray-400 rounded-xl md:rounded-lg p-3 md:p-7 space-y-5"
                onSubmit={handleSendNotification}
            >
                <div>
                    <label className='font-normal text-xl text-gray-600'>Title</label>
                    <input 
                        type="text" 
                        className='w-full p-2 border border-gray-400 rounded-lg mt-1 bg-transparent focus:border focus:border-gray-400' 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className='font-normal text-xl text-gray-600'>Body</label>
                    <textarea 
                        rows={5} 
                        className='w-full p-2 border border-gray-400 rounded-lg mt-1 bg-transparent focus:border focus:border-gray-400' 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div className='flex items-center justify-center md:items-end md:justify-end'>
                    {
                        title === "" || body === "" ? (
                            <button disabled className='bg-gray-300 text-gray-600 py-4 px-7 rounded-full'>Send Notification</button>
                        ) : (
                            <button className='bg-blue-500 text-white py-4 px-7 rounded-full' type='submit'>Send Notification</button>
                        )
                    }
                </div>
            </form>
        </div>

        {showConfirmationModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center md:w-1/3">
                    <div className="flex w-full items-end justify-end">
                        <button 
                            className="bg-gray-200 p-2 flex items-end justify-end rounded-full"
                            onClick={() => setShowConfirmationModal(false)}
                        >
                            <FaX />
                        </button>
                    </div>
                    <h2 className='text-xl font-semibold text-blue-500 mb-4'>Send Post Notifications</h2>
                    <p className="mb-3">Do you want to send post notification?</p>
                    <div className="flex justify-end space-x-3 w-full">
                        <button 
                            className="bg-gray-300 text-gray-600 py-2 px-4 rounded-full w-full"
                            onClick={() => setShowConfirmationModal(false)}
                        >
                            No
                        </button>
                        <button 
                            className="bg-blue-500 text-white py-2 px-4 rounded-full w-full"
                            onClick={handleConfirmSend}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )}

        {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center md:w-1/3">
                    <h2 className="text-xl font-semibold text-blue-500 mb-4">Successful</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="currentColor" className="size-12 p-2 rounded-full text-white mb-1 bg-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <p className="mb-6">Notification sent successfully</p>
                    <button 
                        className="bg-blue-500 text-white py-2 px-4 rounded-full w-full"
                        onClick={() => setShowSuccessModal(false)}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        )}

        <Toaster />
    </Layout>
  )
}

export default Notification
