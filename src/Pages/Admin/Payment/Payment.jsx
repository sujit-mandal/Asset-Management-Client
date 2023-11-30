import { useState } from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import PaymentModal from "../../../Components/Shared/Modals/PaymentModal";


const Payment = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { data: currentUser } = useCurrentUser();
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <PaymentModal
        isOpen={isOpen}
        closeModal={closeModal}
        packageInfo={currentUser?.package}
        user={currentUser}
      ></PaymentModal>
    </div>
  );
};

export default Payment;
