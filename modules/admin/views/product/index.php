<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\modules\admin\models\ProductSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Продукты';
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="row">
    <div class="col-md-12">
        <div class="box">
            <div class="box-header with-border">
                <?= Html::a('Создать продукт', ['create'], ['class' => 'btn btn-success']) ?>
            </div>
            <div class="box-body">

                <div class="product-index">
                    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

                    <?= GridView::widget([
                        'dataProvider' => $dataProvider,
                        'filterModel' => $searchModel,
                        'columns' => [
                            ['class' => 'yii\grid\SerialColumn'],

                            'id',
                            [
                                'attribute' => 'category_id',
                                'value' => function($data) {
                                    return $data->category->title;
                                }
                            ],
                            // 'category_id',
                            'title',
                            // 'content:ntext',
                            'price',
                            //'old_price',
                            //'description',
                            //'keywords',
                            //'img',
                            //'is_offer',

                            ['class' => 'yii\grid\ActionColumn'],
                        ],
                    ]); ?>
                </div>

            </div>
        </div>
    </div>
</div>                  



