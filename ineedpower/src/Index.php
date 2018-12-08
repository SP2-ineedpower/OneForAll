use smtech\OAuth2\Client\Provider\CanvasLMS;

session_start();

/* anti-fat-finger constant definitions */
define('CODE', 'code');
define('STATE', 'state');
define('STATE_LOCAL', 'oauth2-state');

$provider = new CanvasLMS([
    'clientId' => '160000000000127',
    'clientSecret' => 'z4RUroeMI0uuRAA8h7dZy6i4QS4GkBqrWUxr9jUdgcZobpVMCEBmOGMNa2D3Ab4A',
    'purpose' => 'INeedPower',
    'redirectUri' => 'https://localhost:8080/index.php,
    'canvasInstanceUrl' => 'https://ehb.instructure.com'
]);

/* if we don't already have an authorization code, let's get one! */
if (!isset($_GET[CODE])) {
    $authorizationUrl = $provider->getAuthorizationUrl();
    $_SESSION[STATE_LOCAL] = $provider->getState();
    header("Location: $authorizationUrl");
    exit;

/* check that the passed state matches the stored state to mitigate cross-site request forgery attacks */
} elseif (empty($_GET[STATE]) || $_GET[STATE] !== $_SESSION[STATE_LOCAL]) {
    unset($_SESSION[STATE_LOCAL]);
    exit('Invalid state');

} else {
    /* try to get an access token (using our existing code) */
    $token = $provider->getAccessToken('authorization_code', [CODE => $_GET[CODE]]);

    /* do something with that token... (probably not just print to screen, but whatevs...) */
    echo $token->getToken();
    exit;
}