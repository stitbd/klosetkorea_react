// import React from 'react';
// import { Container } from 'react-bootstrap';
// import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
// import ProductGrid from '../../../components/ui/ProductGrid/ProductGrid';
// import { useLongWallets } from '../../../features/products/hooks/useProducts';

// const LongWalletSection = () => {
//   const { products, loading } = useLongWallets();
//   const limitedProducts = products?.slice(0, 4); // 👈 ONLY 1 ROW

//   return (
//     <section className="section-wrapper">
//       <Container fluid="xl">
//         <SectionHeader title="LongWallet" viewAllLink="/category/sandal" />
//         <ProductGrid products={limitedProducts} loading={loading} cols={4} />
//       </Container>
//     </section>
//   );
// };

// export default LongWalletSection;
