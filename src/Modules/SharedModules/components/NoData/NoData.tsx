import Nodata from "../../../../assets/images/no-data.png";

function NoData() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="image my-3">
        <img src={Nodata} />
        <div className="text my-4">
          <h5 className="text-center">No Data !</h5>
        </div>
      </div>
    </div>
  );
}

export default NoData;
