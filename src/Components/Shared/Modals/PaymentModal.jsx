import CheckoutForm from "../../Form/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useCurrentUser from "../../../hooks/useCurrentUser";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentModal = ({ isOpen, closeModal, packageInfo }) => {
  const { data: currentUser } = useCurrentUser();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before You Payment
                </Dialog.Title>
                <div className="flex items-center">
                  <div className=" rounded-full p-2 fill-current text-green-700">
                    <svg
                      className="w-7 h-7 align-middle"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-xl ml-3 font-semibold ">
                    {packageInfo?.details}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-lg text-gray-500">
                    Package Type: {packageInfo?.type}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-lg text-gray-500">
                    Payer Name: {currentUser?.name}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-lg text-gray-500">
                    Payer Email: {currentUser?.email}
                  </p>
                </div>

                <hr className="mt-8 " />
                {/* Card data form */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    handleClose={closeModal}
                    packageInfo={packageInfo}
                  ></CheckoutForm>
                </Elements>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PaymentModal;
