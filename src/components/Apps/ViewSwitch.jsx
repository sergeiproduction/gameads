const ViewSwitch = () => {
  return (
    <div className="page-container__app-view-switch">
      <svg
        className="page-container__app-view active"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 14"
      >
        <rect width="14" height="3.11" rx="1" />
        <rect y="10.89" width="14" height="3.11" rx="1" />
        <rect y="5.44" width="14" height="3.11" rx="1" />
      </svg>
      <svg
        className="page-container__app-view"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 14"
      >
        <rect width="5.44" height="5.44" rx="1" />
        <rect y="8.56" width="5.44" height="5.44" rx="1" />
        <rect x="8.56" width="5.44" height="5.44" rx="1" />
        <rect x="8.56" y="8.56" width="5.44" height="5.44" rx="1" />
      </svg>
    </div>
  );
}

export default ViewSwitch;