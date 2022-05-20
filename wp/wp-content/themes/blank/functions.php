<?php
add_action( 'rest_api_init', 'apiAddFields' );
function apiAddFields() {
    register_rest_field( 'post',
        'cat_info',
        array(
            'get_callback'    => 'registerCatName',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
function registerCatName( $post ) {
    $catInfos = get_the_category($post['id']);
    $catDatas = array();
    foreach($catInfos as $catInfo){
        $currentArray = array();
        $currentArray['id'] = $catInfo->term_id;
        $currentArray['slug'] = $catInfo->slug;
        $currentArray['name'] = $catInfo->name;
        array_push($catDatas,$currentArray);
    }
    return $catDatas;
}

?>
