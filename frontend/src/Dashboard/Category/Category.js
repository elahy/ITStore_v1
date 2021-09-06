import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setLoaderValue } from "../../store/action/loaderAction";
import Loader from "../../Components/Loader";
import { useHistory } from "react-router";
import { requestCategoryList } from "../../store/action/categoryAction";

const useStyles = makeStyles({
  root: {
    display: "flex",
    // minHeight: "70vh",
  },
  image: {
    maxWidth: "60px",
    maxHeight: "60px",
    padding: "0 1% ",
  },
  button: {
    maxHeight: "35px",
    padding: "8px 20px ",
    margin: "0 1%",
  },
});

function Category() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { categoryStore, loaderStore } = useSelector((store) => store);
  console.log(categoryStore, "===Category Store");
  const productList = categoryStore.categoryList;
  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestCategoryList());
  }, [dispatch]);
  const updateHandler = (e) => {
    console.log(e, "==update Event");
    history.push(`/update/${e._id}`);
  };
  const deleteHandler = (e) => {
    history.push(`/delete/${e._id}`);
  };

  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : (
        <div>
          {productList.map((product) => (
            <div key={product._id} className={classes.root}>
              {/* <img
                src={`http://localhost:8080${product.image}`}
                alt={product.title}
                className={classes.image}
              /> */}
              {console.log(product.image, "===image")}
              <p className={classes.button}>{product._id}</p>
              <p className={classes.button}>{product.name}</p>
              <p className={classes.button}>{product.description}</p>
              <button
                className={classes.button}
                onClick={() => updateHandler(product)}
              >
                Edit
              </button>
              <button className={classes.button} onClick={deleteHandler}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Category;