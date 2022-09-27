<?php

namespace app\controllers;

use app\models\Category;
use app\models\Product;
use yii\web\NotFoundHttpException;
use yii\data\Pagination;
use yii\web\Request;

class ProductController extends AppController {


    public function actionView($id) {
        $product = Product::findOne($id);
        if(empty($product)) {
            throw new NotFoundHttpException('Такого продукта нет');
        }

        $this->setMeta("{$product->title} :: " . \Yii::$app->name, $product->keywords, $product->description);
        return $this->render('view', compact('product'));
    }
}