const { Router } = require("express");
const { categoryController, productController, userController,authController } = require("../controllers")
const verifyToken = require("./validate-token");
const router = Router();

router.post("/login",authController.auth)

// Rutas Categorias

router.post("/category/create",categoryController.addCategory)
router.get("/category/list",verifyToken, categoryController.getAllCategories);
router.get("/category/search/:id", categoryController.getCategory);
router.put("/category/update/", categoryController.updateCategory);
router.delete("/category/delete/:id", categoryController.deleteCategory);
// Rutas Productos
router.get("/products/list", productController.getAllProducts);
router.post("/products/create", productController.addProducts);
router.get("/products/search/:id", productController.getProductById);
router.get("/products/search-by-name/:name", productController.getProductByName);
router.put("/products/update/", productController.updateProduct);
router.delete("/products/delete/:id", productController.deleteProduct);


//Rutas Usuario
router.get("/user/list",verifyToken,userController.getAllUsers);
router.get("/user/search/:id",userController.getUser);
router.post("/user/create",userController.createUser);
router.put("/user/update/:id",userController.updateUser);
router.delete("/user/delete/:id",userController.deleteUser);

module.exports = router;
