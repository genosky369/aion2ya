'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface RankingPlayer {
  player_id: string;
  server: string;
  race: string;
  count: number;
}

interface ShameRankingProps {
  limit?: number;
  showTitle?: boolean;
  compact?: boolean;
}

const THEME = {
  card: 'bg-slate-900/50 border-slate-800/50',
};

export default function ShameRanking({ limit = 5, showTitle = true, compact = false }: ShameRankingProps) {
  const [ranking, setRanking] = useState<RankingPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRanking();
  }, [limit]);

  async function fetchRanking() {
    try {
      // player_id별로 그룹화하여 카운트
      const { data, error } = await supabase
        .from('shame_posts')
        .select('player_id, server, race');

      if (error) throw error;

      if (data) {
        // 플레이어별 박제 횟수 집계
        const playerCounts: { [key: string]: RankingPlayer } = {};

        data.forEach((post) => {
          const key = `${post.player_id}_${post.server}_${post.race}`;
          if (playerCounts[key]) {
            playerCounts[key].count++;
          } else {
            playerCounts[key] = {
              player_id: post.player_id,
              server: post.server,
              race: post.race,
              count: 1,
            };
          }
        });

        // 카운트 기준 정렬 후 상위 N개 추출
        const sortedRanking = Object.values(playerCounts)
          .sort((a, b) => b.count - a.count)
          .slice(0, limit);

        setRanking(sortedRanking);
      }
    } catch (error) {
      console.error('Error fetching ranking:', error);
    } finally {
      setLoading(false);
    }
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Medal className="w-5 h-5 text-slate-300" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm text-slate-500 font-bold">{index + 1}</span>;
    }
  };

  const getRankBgColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-yellow-500/10 border-yellow-500/30';
      case 1:
        return 'bg-slate-400/10 border-slate-400/30';
      case 2:
        return 'bg-amber-600/10 border-amber-600/30';
      default:
        return 'bg-slate-800/30 border-slate-700/30';
    }
  };

  if (loading) {
    return (
      <Card className={`${THEME.card} border backdrop-blur-xl`}>
        {showTitle && (
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">박제 랭킹</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (ranking.length === 0) {
    return (
      <Card className={`${THEME.card} border backdrop-blur-xl`}>
        {showTitle && (
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">박제 랭킹</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            아직 박제된 유저가 없습니다.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${THEME.card} border backdrop-blur-xl`}>
      {showTitle && (
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            박제 랭킹
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={compact ? 'pt-2' : ''}>
        <div className="space-y-2">
          {ranking.map((player, index) => (
            <div
              key={`${player.player_id}_${player.server}_${player.race}`}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:scale-[1.02] ${getRankBgColor(index)}`}
            >
              {/* 순위 아이콘 */}
              <div className="flex-shrink-0">
                {getRankIcon(index)}
              </div>

              {/* 플레이어 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white truncate">
                    {player.player_id}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${player.race === '천족' ? 'border-blue-500/50 text-blue-400' : 'border-red-500/50 text-red-400'}`}
                  >
                    {player.race}
                  </Badge>
                </div>
                {!compact && (
                  <span className="text-xs text-slate-500">{player.server}</span>
                )}
              </div>

              {/* 박제 횟수 */}
              <div className="flex-shrink-0">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  {player.count}회
                </Badge>
              </div>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}
