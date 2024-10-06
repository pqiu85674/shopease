import { Modal } from "antd";
import React from "react";

function PopupModal() {
  const modalKey = "surfshark";
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const now = Date.now();
    const modal = JSON.parse(localStorage.getItem("modalkey"));
    if (!modal) {
      setIsModalOpen(true);
      localStorage.setItem("modalkey", JSON.stringify({ modalKey, now }));
    } else {
      if (now - modal.now > 100000) {
        localStorage.removeItem("modalkey");
        setIsModalOpen(true);
        localStorage.setItem("modalkey", JSON.stringify({ modalKey, now }));
      }
    }
  }, []);

  return (
    isModalOpen && (
      <Modal
        title=""
        open
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={false}
      >
        <a href="https://surfshark.com/zh-tw" target="_blank" rel="noopener noreferrer">
          <img
            alt="Surfshark VPN"
            src={
              "https://i0.wp.com/income-lab.com/wp-content/uploads/2023/05/20230908154026_71.png?resize=1170%2C779&quality=100&ssl=1"
            }
          />
        </a>
      </Modal>
    )
  );
}

export default PopupModal;
