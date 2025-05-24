// import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
// import styles from "../styles/Home.module.css";
// import Image from "next/image";
// import { NextPage } from "next";
// import NextLink from 'next/link';
// import { Box, Container, Flex, SimpleGrid, Stack, Heading, Button, Text, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { motion } from 'framer-motion';
// import { keyframes } from '@emotion/react';

// const gradient = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const Home: NextPage = () => {
//   const address = useAddress();
//   const toast = useToast();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [paymentDetails, setPaymentDetails] = useState<any>(null);

//   // Replace with your actual contract address
//   const { contract } = useContract("0xB23b3F8029a808b56a7b25EF16E50D37A35Da6DB");

//   // Check for pending payments when user connects wallet
//   useEffect(() => {
//     const checkPendingPayments = async () => {
//       if (!address || !contract) return;

//       try {
//         // Get all contracts associated with the user
//         const contracts = await contract.call("getAllContracts");

//         for (const contractId of contracts) {
//           const totalSupply = await contract.call("getTotalSupply", [contractId]);

//           for (let i = 0; i < totalSupply; i++) {
//             const { tokenId, owner } = await contract.call("getTokenIdByOwner", [i, contractId]);

//             // Only check for the current connected wallet
//             if (owner.toLowerCase() === address.toLowerCase()) {
//               const url = await contract.call("returnURI", [tokenId, contractId]);
//               const res = await fetch(url);
//               const obj = await res.json();

//               const now = Math.floor(Date.now() / 1000);
//               const status = Number(obj.status);

//               if (status <= now) {
//                 setPaymentDetails({
//                   tokenId,
//                   contractId,
//                   amount: obj.pay,
//                   status: obj.status,
//                   donations: obj.donations
//                 });
//                 onOpen();
//                 break; // Stop after first found payment
//               }
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Error checking payments:", error);
//         toast({
//           title: "Error",
//           description: "Failed to check subscription status",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     };

//     checkPendingPayments();
//   }, [address, contract]);

//   return (

//     <Box>
//       <Flex 
//         minH="100vh" 
//         alignItems="center" 
//         justifyContent="center"
//         bgGradient="linear(to-br, #0F4C75, #3282B8, #BBE1FA)"
//         css={{
//           backgroundSize: "400% 400%",
//           animation: `${gradient} 15s ease infinite`
//         }}
//         position="relative"
//         overflow="hidden"
//       >

//         <Container maxW="container.xl" position="relative" zIndex={2}>
//           <Stack spacing={8} align="center" textAlign="center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <Heading 
//                 fontSize={{ base: '5xl', md: '7xl' }} 
//                 color="white"
//                 textShadow="0 4px 30px rgba(0,0,0,0.15)"
//               >
//                 Revolutionize Subscriptions with NFTs
//                 <Text as="span" display="block" fontSize="2xl" mt={4}>
//                 Own, Trade, and Manage Your Subscriptions Like Never Before
//                 </Text>
//               </Heading>
//             </motion.div>

//             <SimpleGrid 
//               columns={{ base: 1, md: 3 }} 
//               spacing={8} 
//               mt={16}
//               w="full"
//             >
//               {[
//                 { 
//                   title: 'Well-being', 
//                   image: '/images/dumbbell.png',
//                   link: '/gym/gym_index'
//                 },
//                 { 
//                   title: 'Food Delivery', 
//                   image: '/images/delivery.png',
//                   link: '/food_delivery/food_delivery_index'
//                 },
//                 { 
//                   title: 'Charity', 
//                   image: '/images/charity.png',
//                   link: '/charity/charity_index'
//                 }
//               ].map((item, i) => (
//                 <motion.div
//                   key={i}
//                   whileHover={{ y: -10 }}
//                 >
//                   <Button
//                     as={NextLink}
//                     href={item.link}
//                     variant="unstyled"
//                     w="full"
//                     h="full"
//                   >
//                     <Box
//                       bg="whiteAlpha.200"
//                       backdropFilter="blur(10px)"
//                       borderRadius="2xl"
//                       p={6}
//                       border="1px solid"
//                       borderColor="whiteAlpha.300"
//                       w="full"
//                       h="full"
//                     >
//                       <Box
//                         h="200px"
//                         w="full"
//                         borderRadius="xl"
//                         mb={4}
//                         overflow="hidden"
//                         display="flex"
//                         alignItems="center"
//                         justifyContent="center"
//                       >
//                         <Image
//                                     src={item.image}
//                                     alt=""
//                                     width={180}
//                                     height={180}
//                                     objectFit="contain" />
//                       </Box>
//                       <Text fontSize="xl" color="white" fontWeight="bold">
//                         {item.title}
//                       </Text>
//                     </Box>
//                   </Button>
//                 </motion.div>
//               ))}
//             </SimpleGrid>
//           </Stack>
//         </Container>
//       </Flex>

//       <Box py={24} bg="gray.50">
//         <Container maxW="container.lg">
//           <Heading textAlign="center" mb={16}>
//             Why Choose Our Platform?
//           </Heading>

//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
//             {[
//               { 
//                 title: 'For Users', 
//                 desc: 'Full control over subscriptions - buy, sell or trade anytime. Manage all your subscriptions in one place with our intuitive mobile app.'
//               },
//               { 
//                 title: 'For Businesses', 
//                 desc: 'Reduce operational costs with blockchain automation. Access new revenue streams from secondary market transactions and reach wider audiences.'
//               },
//               { 
//                 title: 'For Everyone', 
//                 desc: 'First truly flexible subscription ecosystem powered by NFTs. No more rigid commitments - your subscriptions become liquid digital assets.'
//               }
//             ].map((feature, i) => (
//               <Box
//                 key={i}
//                 p={8}
//                 bg="white"
//                 borderRadius="2xl"
//                 boxShadow="xl"
//                 textAlign="center"
//                 transition="all 0.3s"
//                 _hover={{
//                   transform: 'translateY(-5px)',
//                   boxShadow: '2xl'
//                 }}
//                 minH="300px"
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="center"
//               >
//                 <Heading fontSize="xl" mb={4} color="#3282B8">
//                   {feature.title}
//                 </Heading>
//                 <Text color="gray.600">{feature.desc}</Text>
//               </Box>
//             ))}
//           </SimpleGrid>
//         </Container>
//       </Box>


//       {/* Payment Notification Modal */}
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Subscription Payment Due</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text>Your subscription payment is due. Please visit your Charity NFTs to complete the payment.</Text>
//             <Text mt={4}>Amount Due: {paymentDetails?.amount} ETH</Text>
//             <Text>Token ID: {paymentDetails?.tokenId}</Text>
//           </ModalBody>
//           <ModalFooter>
//             <Button
//               as={NextLink}
//               href="/charity/charity_index"
//               colorScheme="blue"
//               mr={3}
//               onClick={onClose}
//             >
//               View My Charity NFTs
//             </Button>
//             <Button variant="ghost" onClick={onClose}>
//               Remind Me Later
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default Home;

// import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
// import styles from "../styles/Home.module.css";
// import Image from "next/image";
// import { NextPage } from "next";
// import NextLink from 'next/link';
// import { Box, Container, Flex, SimpleGrid, Stack, Heading, Button, Text, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { motion } from 'framer-motion';
// import { keyframes } from '@emotion/react';

// const gradient = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const Home: NextPage = () => {
//   const address = useAddress();
//   const toast = useToast();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [paymentDetails, setPaymentDetails] = useState<any>(null);

//   // Check for payment notifications when user connects wallet
//   useEffect(() => {
//     const checkForNotifications = async () => {
//       if (!address) return;

//       try {
//         const response = await fetch(`/api/webhook?user=${address}`);
//         const data = await response.json();

//         if (data.notifications && data.notifications.length > 0) {
//           // Get the most recent notification
//           const latestNotification = data.notifications[0];
//           setPaymentDetails({
//             tokenId: latestNotification.tokenId,
//             contractId: latestNotification.contractId,
//             amount: latestNotification.amount,
//             status: latestNotification.status,
//             donations: latestNotification.donations
//           });
//           onOpen();
//         }
//       } catch (error) {
//         console.error("Error checking notifications:", error);
//         toast({
//           title: "Error",
//           description: "Failed to check payment notifications",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     };

//     checkForNotifications();

//     // Optional: Set up polling to check for new notifications periodically
//     const interval = setInterval(checkForNotifications, 30000); // Every 30 seconds

//     return () => clearInterval(interval);
//   }, [address]);

//   return (

//     <Box>
//       <Flex 
//         minH="100vh" 
//         alignItems="center" 
//         justifyContent="center"
//         bgGradient="linear(to-br, #0F4C75, #3282B8, #BBE1FA)"
//         css={{
//           backgroundSize: "400% 400%",
//           animation: `${gradient} 15s ease infinite`
//         }}
//         position="relative"
//         overflow="hidden"
//       >

//         <Container maxW="container.xl" position="relative" zIndex={2}>
//           <Stack spacing={8} align="center" textAlign="center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <Heading 
//                 fontSize={{ base: '5xl', md: '7xl' }} 
//                 color="white"
//                 textShadow="0 4px 30px rgba(0,0,0,0.15)"
//               >
//                 Revolutionize Subscriptions with NFTs
//                 <Text as="span" display="block" fontSize="2xl" mt={4}>
//                 Own, Trade, and Manage Your Subscriptions Like Never Before
//                 </Text>
//               </Heading>
//             </motion.div>

//             <SimpleGrid 
//               columns={{ base: 1, md: 3 }} 
//               spacing={8} 
//               mt={16}
//               w="full"
//             >
//               {[
//                 { 
//                   title: 'Well-being', 
//                   image: '/images/dumbbell.png',
//                   link: '/gym/gym_index'
//                 },
//                 { 
//                   title: 'Food Delivery', 
//                   image: '/images/delivery.png',
//                   link: '/food_delivery/food_delivery_index'
//                 },
//                 { 
//                   title: 'Charity', 
//                   image: '/images/charity.png',
//                   link: '/charity/charity_index'
//                 }
//               ].map((item, i) => (
//                 <motion.div
//                   key={i}
//                   whileHover={{ y: -10 }}
//                 >
//                   <Button
//                     as={NextLink}
//                     href={item.link}
//                     variant="unstyled"
//                     w="full"
//                     h="full"
//                   >
//                     <Box
//                       bg="whiteAlpha.200"
//                       backdropFilter="blur(10px)"
//                       borderRadius="2xl"
//                       p={6}
//                       border="1px solid"
//                       borderColor="whiteAlpha.300"
//                       w="full"
//                       h="full"
//                     >
//                       <Box
//                         h="200px"
//                         w="full"
//                         borderRadius="xl"
//                         mb={4}
//                         overflow="hidden"
//                         display="flex"
//                         alignItems="center"
//                         justifyContent="center"
//                       >
//                         <Image
//                                     src={item.image}
//                                     alt=""
//                                     width={180}
//                                     height={180}
//                                     objectFit="contain" />
//                       </Box>
//                       <Text fontSize="xl" color="white" fontWeight="bold">
//                         {item.title}
//                       </Text>
//                     </Box>
//                   </Button>
//                 </motion.div>
//               ))}
//             </SimpleGrid>
//           </Stack>
//         </Container>
//       </Flex>

//       <Box py={24} bg="gray.50">
//         <Container maxW="container.lg">
//           <Heading textAlign="center" mb={16}>
//             Why Choose Our Platform?
//           </Heading>

//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
//             {[
//               { 
//                 title: 'For Users', 
//                 desc: 'Full control over subscriptions - buy, sell or trade anytime. Manage all your subscriptions in one place with our intuitive mobile app.'
//               },
//               { 
//                 title: 'For Businesses', 
//                 desc: 'Reduce operational costs with blockchain automation. Access new revenue streams from secondary market transactions and reach wider audiences.'
//               },
//               { 
//                 title: 'For Everyone', 
//                 desc: 'First truly flexible subscription ecosystem powered by NFTs. No more rigid commitments - your subscriptions become liquid digital assets.'
//               }
//             ].map((feature, i) => (
//               <Box
//                 key={i}
//                 p={8}
//                 bg="white"
//                 borderRadius="2xl"
//                 boxShadow="xl"
//                 textAlign="center"
//                 transition="all 0.3s"
//                 _hover={{
//                   transform: 'translateY(-5px)',
//                   boxShadow: '2xl'
//                 }}
//                 minH="300px"
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="center"
//               >
//                 <Heading fontSize="xl" mb={4} color="#3282B8">
//                   {feature.title}
//                 </Heading>
//                 <Text color="gray.600">{feature.desc}</Text>
//               </Box>
//             ))}
//           </SimpleGrid>
//         </Container>
//       </Box>


//       {/* Payment Notification Modal */}
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Subscription Payment Due</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text>Your subscription payment is due. Please visit your Charity NFTs to complete the payment.</Text>
//             <Text mt={4}>Amount Due: {paymentDetails?.amount} ETH</Text>
//             <Text>Token ID: {paymentDetails?.tokenId}</Text>
//           </ModalBody>
//           <ModalFooter>
//             <Button 
//               as={NextLink} 
//               href="/charity/charity_index" 
//               colorScheme="blue" 
//               mr={3} 
//               onClick={onClose}
//             >
//               View My Charity NFTs
//             </Button>
//             <Button variant="ghost" onClick={onClose}>
//               Remind Me Later
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default Home;

// import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
// import { Box, Container, Flex, SimpleGrid, Stack, Heading, Button, Text, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import Image from "next/image";
// import { NextPage } from "next";
// import NextLink from 'next/link';
// import { motion } from 'framer-motion';
// import { keyframes } from '@emotion/react';

// const gradient = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const Home: NextPage = () => {
//   const address = useAddress();
//   const toast = useToast();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [paymentDetails, setPaymentDetails] = useState<any>(null);
//   const { contract } = useContract("0xB23b3F8029a808b56a7b25EF16E50D37A35Da6DB");

//   useEffect(() => {
//     const checkPendingPayments = async () => {
//       if (!address) return;

//       try {
//         const webhookResponse = await fetch(`/api/webhook?user=${address}`);
//         const webhookData = await webhookResponse.json();

//         if (webhookData.notifications && webhookData.notifications.length > 0) {
//           const latestNotification = webhookData.notifications[0];
//           setPaymentDetails({
//             tokenId: latestNotification.data.tokenId,
//             contractId: latestNotification.data.contractId,
//             amount: latestNotification.data.amount,
//             status: latestNotification.data.status,
//             donations: latestNotification.data.donations
//           });
//           onOpen();
//           return;
//         }

//         if (contract) {
//           const contracts = await contract.call("getAllContracts");
//           for (const contractId of contracts) {
//             const totalSupply = await contract.call("getTotalSupply", [contractId]);
//             for (let i = 0; i < totalSupply; i++) {
//               const { tokenId, owner } = await contract.call("getTokenIdByOwner", [i, contractId]);
//               if (owner.toLowerCase() === address.toLowerCase()) {
//                 const url = await contract.call("returnURI", [tokenId, contractId]);
//                 const res = await fetch(url);
//                 const obj = await res.json();
//                 const now = Math.floor(Date.now() / 1000);
//                 const status = Number(obj.status);
//                 if (status <= now) {
//                   setPaymentDetails({
//                     tokenId,
//                     contractId,
//                     amount: obj.pay,
//                     status: obj.status,
//                     donations: obj.donations
//                   });
//                   onOpen();
//                   break;
//                 }
//               }
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Error checking payments:", error);
//         toast({
//           title: "Error",
//           description: "Failed to check subscription status",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     };

//     checkPendingPayments();

//     const interval = setInterval(checkPendingPayments, 300000);
//     return () => clearInterval(interval);
//   }, [address, contract]);

//   return (
//     <Box>
//       <Flex
//         minH="100vh"
//         alignItems="center"
//         justifyContent="center"
//         bgGradient="linear(to-br, #0F4C75, #3282B8, #BBE1FA)"
//         css={{
//           backgroundSize: "400% 400%",
//           animation: `${gradient} 15s ease infinite`
//         }}
//         position="relative"
//         overflow="hidden"
//       >
//         <Container maxW="container.xl" position="relative" zIndex={2}>
//           <Stack spacing={8} align="center" textAlign="center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <Heading
//                 fontSize={{ base: '5xl', md: '7xl' }}
//                 color="white"
//                 textShadow="0 4px 30px rgba(0,0,0,0.15)"
//               >
//                 Revolutionize Subscriptions with NFTs
//                 <Text as="span" display="block" fontSize="2xl" mt={4}>
//                   Own, Trade, and Manage Your Subscriptions Like Never Before
//                 </Text>
//               </Heading>
//             </motion.div>

//             <SimpleGrid
//               columns={{ base: 1, md: 3 }}
//               spacing={8}
//               mt={16}
//               w="full"
//             >
//               {[
//                 {
//                   title: 'Well-being',
//                   image: '/images/dumbbell.png',
//                   link: '/gym/gym_index'
//                 },
//                 {
//                   title: 'Food Delivery',
//                   image: '/images/delivery.png',
//                   link: '/food_delivery/food_delivery_index'
//                 },
//                 {
//                   title: 'Charity',
//                   image: '/images/charity.png',
//                   link: '/charity/charity_index'
//                 }
//               ].map((item, i) => (
//                 <motion.div
//                   key={i}
//                   whileHover={{ y: -10 }}
//                 >
//                   <Button
//                     as={NextLink}
//                     href={item.link}
//                     variant="unstyled"
//                     w="full"
//                     h="full"
//                   >
//                     <Box
//                       bg="whiteAlpha.200"
//                       backdropFilter="blur(10px)"
//                       borderRadius="2xl"
//                       p={6}
//                       border="1px solid"
//                       borderColor="whiteAlpha.300"
//                       w="full"
//                       h="full"
//                     >
//                       <Box
//                         h="200px"
//                         w="full"
//                         borderRadius="xl"
//                         mb={4}
//                         overflow="hidden"
//                         display="flex"
//                         alignItems="center"
//                         justifyContent="center"
//                       >
//                         <Image
//                           src={item.image}
//                           alt=""
//                           width={180}
//                           height={180}
//                           objectFit="contain"
//                         />
//                       </Box>
//                       <Text fontSize="xl" color="white" fontWeight="bold">
//                         {item.title}
//                       </Text>
//                     </Box>
//                   </Button>
//                 </motion.div>
//               ))}
//             </SimpleGrid>
//           </Stack>
//         </Container>
//       </Flex>

//       <Box py={24} bg="gray.50">
//         <Container maxW="container.lg">
//           <Heading textAlign="center" mb={16}>
//             Why Choose Our Platform?
//           </Heading>

//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
//             {[
//               {
//                 title: 'For Users',
//                 desc: 'Full control over subscriptions - buy, sell or trade anytime. Manage all your subscriptions in one place with our intuitive mobile app.'
//               },
//               {
//                 title: 'For Businesses',
//                 desc: 'Reduce operational costs with blockchain automation. Access new revenue streams from secondary market transactions and reach wider audiences.'
//               },
//               {
//                 title: 'For Everyone',
//                 desc: 'First truly flexible subscription ecosystem powered by NFTs. No more rigid commitments - your subscriptions become liquid digital assets.'
//               }
//             ].map((feature, i) => (
//               <Box
//                 key={i}
//                 p={8}
//                 bg="white"
//                 borderRadius="2xl"
//                 boxShadow="xl"
//                 textAlign="center"
//                 transition="all 0.3s"
//                 _hover={{
//                   transform: 'translateY(-5px)',
//                   boxShadow: '2xl'
//                 }}
//                 minH="300px"
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="center"
//               >
//                 <Heading fontSize="xl" mb={4} color="#3282B8">
//                   {feature.title}
//                 </Heading>
//                 <Text color="gray.600">{feature.desc}</Text>
//               </Box>
//             ))}
//           </SimpleGrid>
//         </Container>
//       </Box>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Charity Donation Reminder</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text>It's time to make your weekly donation for your Charity NFT:</Text>
//             <Box mt={4} p={4} bg="gray.100" borderRadius="md">
//               {paymentDetails ? (
//                 <>
//                   <Text fontWeight="bold">Charity NFT #{paymentDetails.tokenId}</Text>
//                   <Text>Donation Amount: {ethers.utils.formatEther(paymentDetails.amount)} ETH</Text>
//                   <Text>Total Donated: {ethers.utils.formatEther(paymentDetails.donations || "0")} ETH</Text>
//                   <Text>Status: {paymentDetails.status === "0" ? "Paused" : "Active"}</Text>
//                 </>
//               ) : (
//                 <Text>Loading NFT details...</Text>
//               )}
//             </Box>
//           </ModalBody>
//           <ModalFooter>
//             <Button
//               as={NextLink}
//               href={`/charity/charity_index`}
//               colorScheme="blue"
//               mr={3}
//               onClick={onClose}
//             >
//               Make Donation
//             </Button>
//             <Button variant="ghost" onClick={onClose}>
//               Remind Me Later
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default Home;

//       // {/* <Modal isOpen={isOpen} onClose={onClose}>
//       //   <ModalOverlay />
//       //   <ModalContent>
//       //     <ModalHeader>Subscription Payment Due</ModalHeader>
//       //     <ModalCloseButton />
//       //     <ModalBody>
//       //       <Text>Your subscription payment is due. Please visit your Charity NFTs to complete the payment.</Text>
//       //       <Text mt={4}>Amount Due: {paymentDetails?.amount} ETH</Text>
//       //       <Text>Token ID: {paymentDetails?.tokenId}</Text>
//       //       <Text>Contract ID: {paymentDetails?.contractId}</Text>
//       //     </ModalBody>
//       //     <ModalFooter>
//       //       <Button
//       //         as={NextLink}
//       //         href="/charity/charity_index"
//       //         colorScheme="blue"
//       //         mr={3}
//       //         onClick={onClose}
//       //       >
//       //         View My Charity NFTs
//       //       </Button>
//       //       <Button variant="ghost" onClick={onClose}>
//       //         Remind Me Later
//       //       </Button>
//       //     </ModalFooter>
//       //   </ModalContent>
//       // </Modal> */}

import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import { Box, Container, Flex, SimpleGrid, Stack, Heading, Button, Text, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import { NextPage } from "next";
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

interface PaymentDetails {
  tokenId: string;
  contractId: string;
  amount: string;
  status: string;
  donations?: string;
}

const Home: NextPage = () => {
  const address = useAddress();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { contract } = useContract("0xB23b3F8029a808b56a7b25EF16E50D37A35Da6DB");

  // const checkPendingPayments = async () => {
  //   if (!address) return;
  //   setIsLoading(true);

  //   try {
  //     // Check webhook notifications first
  //     const webhookResponse = await fetch(`/api/webhook?user=${address}`);
  //     if (!webhookResponse.ok) {
  //       throw new Error('Failed to fetch notifications');
  //     }
  //     const webhookData = await webhookResponse.json();

  //     if (webhookData.notifications && webhookData.notifications.length > 0) {
  //       const latestNotification = webhookData.notifications[0];
  //       setPaymentDetails({
  //         tokenId: latestNotification.data.tokenId,
  //         contractId: latestNotification.data.contractId,
  //         amount: latestNotification.data.amount,
  //         status: latestNotification.data.status,
  //         donations: latestNotification.data.donations
  //       });
  //       onOpen();
  //       setIsLoading(false);
  //       return;
  //     }

  //     // Fallback to contract check if no notifications
  //     if (contract) {
  //       const contracts = await contract.call("getAllContracts");
  //       for (const contractId of contracts) {
  //         const totalSupply = await contract.call("getTotalSupply", [contractId]);
  //         for (let i = 0; i < totalSupply; i++) {
  //           const { tokenId, owner } = await contract.call("getTokenIdByOwner", [i, contractId]);
  //           if (owner.toLowerCase() === address.toLowerCase()) {
  //             const url = await contract.call("returnURI", [tokenId, contractId]);
  //             const res = await fetch(url);
  //             const obj = await res.json();
  //             const now = Math.floor(Date.now() / 1000);
  //             const status = Number(obj.status);
  //             if (status <= now) {
  //               setPaymentDetails({
  //                 tokenId: tokenId.toString(),
  //                 contractId: contractId.toString(),
  //                 amount: obj.pay,
  //                 status: obj.status,
  //                 donations: obj.donations
  //               });
  //               onOpen();
  //               break;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error checking payments:", error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to check subscription status",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const checkPendingPayments = async () => {
    if (!address) return;
    setIsLoading(true);

    try {
      // Check webhook notifications
      const webhookResponse = await fetch(`/api/webhook?user=${address}`);
      if (!webhookResponse.ok) throw new Error('Failed to fetch notifications');

      const webhookData = await webhookResponse.json();
      if (webhookData.notifications?.length > 0) {
        setPaymentDetails(webhookData.notifications[0].data);
        onOpen();
      }
    } catch (error) {
      console.error("Error checking payments:", error);
      toast({
        title: "Error",
        description: "Failed to check subscription status",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkPendingPayments();

    const interval = setInterval(checkPendingPayments, 300000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, [address, contract]);

  return (
    <Box>
      <Flex
        minH="100vh"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-br, #0F4C75, #3282B8, #BBE1FA)"
        css={{
          backgroundSize: "400% 400%",
          animation: `${gradient} 15s ease infinite`
        }}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl" position="relative" zIndex={2}>
          <Stack spacing={8} align="center" textAlign="center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Heading
                fontSize={{ base: '5xl', md: '7xl' }}
                color="white"
                textShadow="0 4px 30px rgba(0,0,0,0.15)"
              >
                Revolutionize Subscriptions with NFTs
                <Text as="span" display="block" fontSize="2xl" mt={4}>
                  Own, Trade, and Manage Your Subscriptions Like Never Before
                </Text>
              </Heading>
            </motion.div>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={8}
              mt={16}
              w="full"
            >
              {[
                {
                  title: 'Well-being',
                  image: '/images/dumbbell.png',
                  link: '/gym/gym_index'
                },
                {
                  title: 'Food Delivery',
                  image: '/images/delivery.png',
                  link: '/food_delivery/food_delivery_index'
                },
                {
                  title: 'Charity',
                  image: '/images/charity.png',
                  link: '/charity/charity_index'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                >
                  <Button
                    as={NextLink}
                    href={item.link}
                    variant="unstyled"
                    w="full"
                    h="full"
                  >
                    <Box
                      bg="whiteAlpha.200"
                      backdropFilter="blur(10px)"
                      borderRadius="2xl"
                      p={6}
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                      w="full"
                      h="full"
                    >
                      <Box
                        h="200px"
                        w="full"
                        borderRadius="xl"
                        mb={4}
                        overflow="hidden"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={180}
                          height={180}
                          objectFit="contain"
                        />
                      </Box>
                      <Text fontSize="xl" color="white" fontWeight="bold">
                        {item.title}
                      </Text>
                    </Box>
                  </Button>
                </motion.div>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Flex>

      <Box py={24} bg="gray.50">
        <Container maxW="container.lg">
          <Heading textAlign="center" mb={16}>
            Why Choose Our Platform?
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {[
              {
                title: 'For Users',
                desc: 'Full control over subscriptions - buy, sell or trade anytime. Manage all your subscriptions in one place with our intuitive mobile app.'
              },
              {
                title: 'For Businesses',
                desc: 'Reduce operational costs with blockchain automation. Access new revenue streams from secondary market transactions and reach wider audiences.'
              },
              {
                title: 'For Everyone',
                desc: 'First truly flexible subscription ecosystem powered by NFTs. No more rigid commitments - your subscriptions become liquid digital assets.'
              }
            ].map((feature, i) => (
              <Box
                key={i}
                p={8}
                bg="white"
                borderRadius="2xl"
                boxShadow="xl"
                textAlign="center"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: '2xl'
                }}
                minH="300px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Heading fontSize="xl" mb={4} color="#3282B8">
                  {feature.title}
                </Heading>
                <Text color="gray.600">{feature.desc}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Charity Donation Reminder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>It's time to make your weekly donation for your Charity NFT:</Text>
            <Box mt={4} p={4} bg="gray.100" borderRadius="md">
              {paymentDetails ? (
                <Stack spacing={3}>
                  <Text fontWeight="bold">Charity NFT #{paymentDetails.tokenId}</Text>
                  <Text>Donation Amount: {ethers.utils.formatEther(paymentDetails.amount)} ETH</Text>
                  {paymentDetails.donations && (
                    <Text>Total Donated: {ethers.utils.formatEther(paymentDetails.donations)} ETH</Text>
                  )}
                  <Text>Status: {paymentDetails.status === "0" ? "Paused" : "Active"}</Text>
                </Stack>
              ) : (
                <Text>Loading NFT details...</Text>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              as={NextLink}
              href={`/charity/charity_index`}
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              isLoading={isLoading}
            >
              Make Donation
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Remind Me Later
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;