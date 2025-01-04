<?php

namespace App\Repository;

use App\Entity\Recolte;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Recolte>
 */
class RecolteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Recolte::class);
    }

    /**
     * Récupère les récoltes groupées par date.
     *
     * @return array
     */
    public function findGroupedByDate($rucheId): array
    {
        /*
        $qb = $this->createQueryBuilder('r')
            ->select("DATE_FORMAT(r.date, '%Y-%m') as mois, SUM(r.poids) as totalPoids")
            ->where('r.ruche = :rucheId')
            ->setParameter('rucheId', $rucheId)
            ->groupBy('mois')
            ->orderBy('mois', 'ASC');

        return $qb->getQuery()->getResult();
        */

        $qb = $this->createQueryBuilder('r')
            ->where('r.ruche = :rucheId')
            ->setParameter('rucheId', $rucheId);


        $recoltes = $qb->getQuery()->getResult();

        $grouped = [];
        foreach ($recoltes as $recolte) {
            $mois = $recolte->getDate()->format('Y-m');
            if (!isset($grouped[$mois])) {
                $grouped[$mois] = 0;
            }
            $grouped[$mois] += $recolte->getPoids();
        }

        $result = [];
        foreach ($grouped as $mois => $totalPoids) {
            $result[] = ['mois' => $mois, 'totalPoids' => $totalPoids];
        }

        return $result;
    }







    //    /**
    //     * @return Recolte[] Returns an array of Recolte objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('r')
    //            ->andWhere('r.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('r.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Recolte
    //    {
    //        return $this->createQueryBuilder('r')
    //            ->andWhere('r.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
