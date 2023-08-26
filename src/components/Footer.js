import { ChevronDoubleUpIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

function Footer() {
    const Router = useRouter();
    return (
<footer class="text-center py-4">
  <p>&copy; 2023 Web3Deals.info All rights reserved.</p>
</footer>
    );
}
  
export default Footer;
