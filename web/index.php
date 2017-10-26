<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use MorningTrain\TogglApi\TogglApi;

require_once __DIR__.'/../vendor/autoload.php';

$app = new Silex\Application();

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../views',
));

$app->get('/', function () use ($app) {
    return $app['twig']->render('index.html.twig');
});

$app->get('/api/workspaces', function (Request $request) use ($app) {
    $results = (new TogglApi($request->get('api_token')))->getWorkspaces();
    return new JsonResponse(
        ['results' => $results]
    );
});

$app->get('/api/projects', function (Request $request) use ($app) {
    $results = (new TogglApi($request->get('api_token')))->getWorkspaceProjects($request->get('wid'));
    return new JsonResponse(
        ['results' => $results]
    );
});

$app->post('/api/add-entry', function (Request $request) use ($app) {
    $data = json_decode((string)$request->getContent(), true);
    return new JsonResponse(
        (new TogglApi($request->get('api_token')))->createTimeEntry($data)
    );
});

$app->run();