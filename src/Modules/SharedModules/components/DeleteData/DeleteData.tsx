import noData from "../../../../assets/images/no-data.png";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function DeleteData({ deleteItem }: any) {
  return (
    <>
      <div className=" text-center ">
        <img src={noData} alt="" />
        <h5>Delete This {deleteItem}</h5>
        <p>
          are you sure you want to delete this item ? if you are sure just
          <br /> click on delete it
        </p>
      </div>
    </>
  );
}
