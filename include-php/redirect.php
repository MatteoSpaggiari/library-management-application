<?php	
    function redirect($url,$time = NULL)
    {
        if (!headers_sent())
        {
            if(isset($time))
            {
                header('refresh:'.$time.';url='.$url);
            }
            else
            {
                header('Location: ' . $url);
            }
        } else {
            die('Could not redirect; Output was already sent to the browser.');
        }
    }
?>