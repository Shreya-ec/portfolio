import img from '../assets/notfound.jpg';

export const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center bg-white min-h-screen'>
            <div className='h-150'>
                <img src={img} className='h-full' alt='wrong url' />
            </div>
            <a href="/" className="cosmic-button">
              Go Back
            </a>
        </div>
    );
}