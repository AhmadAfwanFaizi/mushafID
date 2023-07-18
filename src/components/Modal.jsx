import { useContext } from "react";
import { RootContext } from "/src/context/Root";
const Modal = () => {
  const context = useContext(RootContext);
  const { title, subtitle } = context.dataModal;
  return (
    <dialog id="modal" className="modal">
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{subtitle}</p>
      </form>
    </dialog>
  );
};

export default Modal;
